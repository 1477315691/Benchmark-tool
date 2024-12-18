import IconBreadcrumbs from '../../common/IconBreadcrumbs';
import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { StyledContainer } from '../StyledComponents';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../common/UseContext';
import axios from 'axios';

// Import CSS file for styles
import './Run.css';

const RunBenchmark = () => {
  const [name, setname] = React.useState('');
  const [region, setregion] = React.useState('East US 2 EUAP');
  const [description, setdescription] = React.useState('');
  const [primary, setprimary] = React.useState('');
  const [clients, setclients] = React.useState('');
  const [size, setsize] = React.useState('');
  const [requests, setrequests] = React.useState('');
  const [times, settimes] = React.useState('10');
  const [pipeline, setpipeline] = React.useState('');
  const [threads, setthreads] = React.useState('');
  const navigate = useNavigate();
  const { setData } = useData();

  const handleChange = (event: SelectChangeEvent) => {
    setregion(event.target.value as string);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5139/api/BenchmarkRun', {
        name,
        primary,
        region,
        description,
        clients,
        threads,
        size,
        requests,
        pipeline,
        times
      });
      setData(response.data);
      console.log('Submission successful:', response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleRoutine = () => {
    //常规做法
  };

  return (
    <div>
      <IconBreadcrumbs />
      <StyledContainer maxWidth="xl">
        <Typography variant="h4" gutterBottom>
          Run Test
        </Typography>
        <Box component="form" noValidate autoComplete="off" sx={{ maxWidth: 600 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} >
              <Box>
                <InputLabel id="testname-label" className="benchmark-input-label">Name of the test</InputLabel>
                <TextField 
                  fullWidth 
                  id="testname"  
                  variant="outlined"
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} >
              <Box>
                <InputLabel id="Primaryname-label" className="benchmark-input-label">Primary String()</InputLabel>
                <TextField 
                  fullWidth 
                  id="primary" 
                  variant="outlined" 
                  type="text"
                  value={primary}
                  onChange={(e) => setprimary(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} >
              <Box>
                <InputLabel id="region-select-label" className="benchmark-input-label">Region</InputLabel>
                <Select
                  fullWidth
                  labelId="region-id"
                  id="region-select"
                  value={region}
                  label="region"
                  onChange={handleChange}
                >
                  <MenuItem value="East US 2 EUAP">East US 2 EUAP</MenuItem>
                  <MenuItem value="Central US EUAP">Central US EUAP</MenuItem>
                  <MenuItem value="East US">East US</MenuItem>
                </Select>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <InputLabel id="description-label" className="benchmark-input-label">Enter a description</InputLabel>
                <TextField 
                  fullWidth 
                  id="description" 
                  variant="outlined" 
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <FormLabel id="demo-row-radio-buttons-group-label" sx={{ display: 'block', mb: 2 }}>
                  Select test type
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  defaultValue="Stress"
                >
                  <FormControlLabel value="Performance" control={<Radio />} label="Performance" />
                  <FormControlLabel value="Stress" control={<Radio />} label="Stress" />
                </RadioGroup>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <InputLabel id="description-label" className="benchmark-input-label">Select test way</InputLabel>
                <FormGroup row>
                  <FormControlLabel control={<Checkbox />} label="Set" />
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Get" />
                </FormGroup>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Box component="form" noValidate autoComplete="off" className="benchmark-form-box">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item xs={6}>
                      <InputLabel id="clients-label" className="benchmark-grid-label">Clients (-c)</InputLabel>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField 
                        fullWidth 
                        id="clients" 
                        variant="outlined" 
                        size="small" 
                        className="benchmark-text-field"
                        value={clients}
                        onChange={(e) => setclients(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item xs={6}>
                      <InputLabel id="number-times" className="benchmark-grid-label">Threads</InputLabel>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField 
                        fullWidth 
                        id="number-times" 
                        variant="outlined" 
                        size="small" 
                        className="benchmark-text-field"
                        value={threads}
                        onChange={(e) => setthreads(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item xs={6}>
                      <InputLabel id="payload-size-label" className="benchmark-grid-label">Payload size (bytes) (-d)</InputLabel>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField 
                        fullWidth 
                        id="payload-size" 
                        variant="outlined" 
                        size="small" 
                        className="benchmark-text-field"
                        value={size}
                        onChange={(e) => setsize(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item xs={6}>
                      <InputLabel id="number-of-requests-label" className="benchmark-grid-label">Number of requests (-n)</InputLabel>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField 
                        fullWidth 
                        id="number-of-requests" 
                        variant="outlined" 
                        size="small" 
                        className="benchmark-text-field"
                        value={requests}
                        onChange={(e) => setrequests(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item xs={6}>
                      <InputLabel id="pipeline-label" className="benchmark-grid-label">Pipeline (-P)</InputLabel>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField 
                        fullWidth 
                        id="pipeline" 
                        variant="outlined" 
                        size="small" 
                        className="benchmark-text-field"
                        value={pipeline}
                        onChange={(e) => setpipeline(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item xs={6}>
                      <InputLabel id="number-times" className="benchmark-grid-label">Run times( -i )</InputLabel>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField 
                        fullWidth 
                        id="number-times" 
                        variant="outlined" 
                        size="small" 
                        className="benchmark-text-field"
                        value={times}
                        onChange={(e) => settimes(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Button variant="contained" onClick={handleSubmit}>提交</Button>
        <Button variant="contained" style={{ marginLeft: '500px' }} onClick={handleRoutine}>常规</Button>
      </StyledContainer>
    </div>
  );
};

export default RunBenchmark;

