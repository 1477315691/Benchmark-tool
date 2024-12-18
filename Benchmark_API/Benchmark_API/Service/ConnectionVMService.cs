using Azure.Core;
using Azure.ResourceManager.Compute.Models;
using Azure;
using Renci.SshNet;
using System;
using redis.WebAPi.Service.AzureShared;
using Azure.ResourceManager.Compute;
using System.Threading.Tasks;
using System.Linq;
using System.Xml.Linq;
using System.Runtime.InteropServices;
using System.Security.Policy;
using System.Threading;
using System.Diagnostics;
using System.IO;
using System.Drawing;

namespace redis.WebAPi.Service.AzureShared
{
    public class ConnectionVMService
    {
        private readonly AzureClientFactory _client;

        public ConnectionVMService(AzureClientFactory client)
        {
            _client = client;
        }

        public async Task<string> ConnectionVM(
            string cachename,
            string cachepassword,
            int Clients,
            int Threads,
            int Size,
            int Requests,
            int Pipeline,
            int Times)
        {
            try
            {
                var armClient = _client.ArmClient;
                var subResource = armClient.GetSubscriptionResource(new ResourceIdentifier("/subscriptions/" + "fc2f20f5-602a-4ebd-97e6-4fae3f1f6424"));
                var vm1 = (await subResource.GetResourceGroupAsync("MemtierbenchmarkTest")).Value.GetVirtualMachine("MemtierBenchmarkM3-Premium-P5");

                string resultsFilename = "P1-1200.json";

                // ��ȡ�������ʵ����ͼ�Լ����״̬
                var instanceView = await vm1.Value.InstanceViewAsync();
                var statuses = instanceView.Value.Statuses;

                // ���������Ƿ���������
                bool isRunning = statuses.Any(status => status.Code == "PowerState/running");

                if (!isRunning)
                {
                    await vm1.Value.PowerOnAsync(WaitUntil.Completed);
                    Console.WriteLine("�����������");
                }
                else
                {
                    Console.WriteLine("������Ѿ���������");
                }

                //��ʼ������ļ���ִ�л�׼����
                var runCommandInput = new RunCommandInput("RunShellScript")
                {
                    Script =
                        {
                            "cd /home/azureuser", // �л���Ŀ��Ŀ¼
                            // ��ʼ�� results.json �ļ�Ϊ������
                            $"echo '[]' > {resultsFilename}",

                            // ִ�л�׼����
                            $"for i in $(seq 1 {Times}); do " +
                            $"  memtier_benchmark -h {cachename} -a {cachepassword} --threads {Threads} --clients {Clients} -n {Requests} --ratio=1:10 --pipeline {Pipeline} -d {Size} --random-data --key-pattern=S:S --key-minimum=1 --key-maximum=10000 -x 1 --print-percentiles 50,99,99.9,99.99 --json-out-file out.json; " +
                            // ʹ�� jq �ϲ������׷�ӵ� resultsFilename
                            $"  jq -s '.[0] + [.[1]]' {resultsFilename} out.json > out.tmp; " +
                            $"  mv out.tmp {resultsFilename};"+
                            $"done"
                        }
                };

                var secondResponse = (await vm1.Value.RunCommandAsync(WaitUntil.Completed, runCommandInput)).Value;

                // ������н��
                var secondOutput = string.Join("\n", secondResponse.Value.Select(r => r.Message));
                //Console.WriteLine("�ڶ��������\n" + secondOutput); // �ڿ���̨����ڶ����ֵĽ��

                // ���� jq ���������� JSON ���ݲ�����
                var jqCommandInput = new RunCommandInput("RunShellScript")
                {
                    Script =
                        {
                            "cd /home/azureuser",

                            $"jq '[.[] | {{ " +
                            $"\"Total duration\": .[\"ALL STATS\"].Runtime[\"Total duration\"], " +
                            $"\"Time unit\": .[\"ALL STATS\"].Runtime[\"Time unit\"], " +
                            $"\"Gets RPS\": .[\"ALL STATS\"].Gets[\"Ops/sec\"], " +
                            $"\"Gets average latency\": .[\"ALL STATS\"].Gets[\"Average Latency\"], " +
                            $"\"Gets p50.00\": .[\"ALL STATS\"].Gets[\"Percentile Latencies\"][\"p50.00\"], " +
                            $"\"Gets p99.00\": .[\"ALL STATS\"].Gets[\"Percentile Latencies\"][\"p99.00\"], " +
                            $"\"Gets p99.90\": .[\"ALL STATS\"].Gets[\"Percentile Latencies\"][\"p99.90\"], " +
                            $"\"Gets p99.99\": .[\"ALL STATS\"].Gets[\"Percentile Latencies\"][\"p99.99\"], " +
                            $"\"Compressed Histogram\": .[\"ALL STATS\"].Gets[\"Percentile Latencies\"][\"Histogram log format\"][\"Compressed Histogram\"] " +
                            $"}}] | sort_by(.\"Gets RPS\")' {resultsFilename} > {resultsFilename}_sorted.json",

                            //// ʹ�� cat ��������� JSON �ļ����ݵ�����̨
                            //$"cat {resultsFilename}_sorted.json"
                        }
                };

                var jqResponse = (await vm1.Value.RunCommandAsync(WaitUntil.Completed, jqCommandInput)).Value;

                // ������������н��
                var jqOutput = string.Join("\n", jqResponse.Value.Select(r => r.Message));
                //Console.WriteLine("�����������\n" + jqOutput); // �ڿ���̨����������ֵĽ��

                return "Executed successfully!";

            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                throw;
            }
        }


    }
}
