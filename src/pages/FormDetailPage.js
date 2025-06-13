// src/pages/FormDetailPage.js

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Container,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  Autocomplete,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  useTheme, // นำเข้า useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Navbar from '../components/Navbar';
import { mockForms } from '../data/mockData';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function FormDetailPage() {
  const { formId } = useParams();
  const navigate = useNavigate();
  const form = mockForms.find((f) => f.id === formId);

  const [formData, setFormData] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' or 'error'
  const [dynamicInputs, setDynamicInputs] = useState(['']);

  const theme = useTheme(); // เรียกใช้ useTheme เพื่อเข้าถึง theme object

  if (!form) {
    return (
      <Box>
        <Navbar />
        <Container sx={{ mt: 4 }}>
          <Typography variant="h5" color="error" align="center">
            ไม่พบฟอร์มที่ระบุ
          </Typography>
        </Container>
      </Box>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      const currentValues = formData[name] || [];
      const newValues = checked
        ? [...currentValues, value]
        : currentValues.filter((item) => item !== value);
      setFormData({
        ...formData,
        [name]: newValues,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleDateChange = (name, date) => {
    setFormData({
      ...formData,
      [name]: date ? dayjs(date).format('YYYY-MM-DD') : null,
    });
  };

  const handleComboboxChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDynamicInputChange = (index, event) => {
    const newInputs = [...dynamicInputs];
    newInputs[index] = event.target.value;
    setDynamicInputs(newInputs);
    // อัปเดต formData โดยรวม dynamicInputs เป็น array ของ string
    setFormData({
      ...formData,
      [form.fields.find(f => f.type === 'dynamic-text')?.name || 'dynamicTextInput']: newInputs,
    });
  };

  const addDynamicInput = () => {
    setDynamicInputs([...dynamicInputs, '']);
  };

  const removeDynamicInput = (index) => {
    const newInputs = dynamicInputs.filter((_, i) => i !== index);
    setDynamicInputs(newInputs);
    setFormData({
      ...formData,
      [form.fields.find(f => f.type === 'dynamic-text')?.name || 'dynamicTextInput']: newInputs,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Form Data:', formData);

    // จำลองการส่งข้อมูล
    // ตรวจสอบว่ามีข้อมูลถูกกรอกบ้างหรือไม่
    if (Object.keys(formData).length > 0 && Object.values(formData).some(value => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== '' && value !== null;
    })) {
      setSubmissionStatus('success');
      setTimeout(() => {
        setFormData({});
        setDynamicInputs(['']);
        setSubmissionStatus(null);
        navigate('/home');
      }, 2000);
    } else {
      setSubmissionStatus('error');
    }
  };

  // สร้าง ID สำหรับ Accordion แบบ dynamic เล็กน้อย
  const accordionId = `accordion-additional-info-${formId}`;
  const accordionContentId = `panel-additional-info-content-${formId}`;


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Navbar />
        <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
          <Box sx={{
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 3,
            p: { xs: 3, md: 5 },
          }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 2, fontWeight: 700 }}>
              {form.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
              {form.description}
            </Typography>

            <Box
              component="form"
              sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
              onSubmit={handleSubmit}
            >
              {form.fields.map((field) => (
                <FormControl key={field.name} fullWidth required={field.required}>
                  {field.type === 'text' || field.type === 'email' || field.type === 'tel' ? (
                    <TextField
                      label={field.label}
                      variant="outlined"
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      required={field.required}
                    />
                  ) : field.type === 'textarea' ? (
                    <TextField
                      label={field.label}
                      variant="outlined"
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      required={field.required}
                      multiline
                      rows={4}
                    />
                  ) : field.type === 'dropdown' ? (
                    <>
                      <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
                      <Select
                        labelId={`${field.name}-label`}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        label={field.label}
                        required={field.required}
                      >
                        {field.options.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </>
                  ) : field.type === 'combobox' ? (
                    <Autocomplete
                      multiple
                      id={field.name}
                      options={field.options}
                      getOptionLabel={(option) => option}
                      value={formData[field.name] || []}
                      onChange={(event, newValue) => handleComboboxChange(field.name, newValue)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={field.label}
                          placeholder="เลือก..."
                          required={field.required && (!formData[field.name] || formData[field.name].length === 0)}
                        />
                      )}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip label={option} {...getTagProps({ index })} />
                        ))
                      }
                    />
                  ) : field.type === 'date' ? (
                    <DatePicker
                      label={field.label}
                      value={formData[field.name] ? dayjs(formData[field.name]) : null}
                      onChange={(date) => handleDateChange(field.name, date)}
                      slotProps={{ textField: { required: field.required, variant: 'outlined' } }}
                    />
                  ) : field.type === 'radio' ? (
                    <FormControl component="fieldset" required={field.required}>
                      <Typography variant="subtitle1" sx={{ mb: 1, color: 'text.secondary' }}>{field.label}</Typography>
                      <RadioGroup
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        row
                      >
                        {field.options.map((option) => (
                          <FormControlLabel
                            key={option}
                            value={option}
                            control={<Radio />}
                            label={option}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  ) : field.type === 'checkbox' ? (
                    <FormControl component="fieldset" required={field.required}>
                      <Typography variant="subtitle1" sx={{ mb: 1, color: 'text.secondary' }}>{field.label}</Typography>
                      <FormGroup row>
                        {field.options.map((option) => (
                          <FormControlLabel
                            key={option}
                            control={
                              <Checkbox
                                name={field.name}
                                value={option}
                                checked={(formData[field.name] || []).includes(option)}
                                onChange={handleChange}
                              />
                            }
                            label={option}
                          />
                        ))}
                      </FormGroup>
                    </FormControl>
                  ) : field.type === 'attachments' ? (
                    <Button variant="outlined" component="label" sx={{ mt: 1, py: 1.5 }}>
                      <input
                        type="file"
                        hidden
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            console.log('Selected file:', file.name);
                            setFormData({
                              ...formData,
                              [field.name]: file.name,
                            });
                          }
                        }}
                      />
                      อัปโหลด {field.label} {formData[field.name] && `: ${formData[field.name]}`}
                    </Button>
                  ) : field.type === 'dynamic-text' ? (
                    <Box>
                      <Typography variant="subtitle1" gutterBottom sx={{ color: 'text.secondary' }}>
                        {field.label}
                      </Typography>
                      {dynamicInputs.map((input, index) => (
                        <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                          <TextField
                            label={`${field.label} #${index + 1}`}
                            variant="outlined"
                            value={input}
                            onChange={(e) => handleDynamicInputChange(index, e)}
                            fullWidth
                          />
                          {dynamicInputs.length > 1 && (
                            <Button variant="outlined" color="error" onClick={() => removeDynamicInput(index)} sx={{ minWidth: 'auto', px: 2 }}>
                              ลบ
                            </Button>
                          )}
                        </Box>
                      ))}
                      <Button variant="outlined" onClick={addDynamicInput} sx={{ mt: 1 }}>
                        เพิ่มช่อง {field.label}
                      </Button>
                    </Box>
                  ) : null}
                </FormControl>
              ))}

              {/* Collapse & Expand Menu */}
              {/* เปลี่ยน id และ aria-controls ให้เป็น dynamic เพื่อหลีกเลี่ยงการชนกัน */}
              <Accordion sx={{ mt: 3, border: `1px solid ${theme.palette.divider}` }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={accordionContentId} // ใช้ ID ที่สร้างขึ้นมา
                  id={accordionId} // ใช้ ID ที่สร้างขึ้นมา
                >
                  <Typography variant="h6">ข้อมูลเพิ่มเติม (คลิกเพื่อขยาย/ยุบ)</Typography>
                </AccordionSummary>
                <AccordionDetails id={accordionContentId}> {/* ใช้ ID ที่สร้างขึ้นมา */}
                  <TextField
                    label="รายละเอียดเพิ่มเติม"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    value={formData.additionalDetails || ''}
                    onChange={(e) => setFormData({ ...formData, additionalDetails: e.target.value })}
                  />
                </AccordionDetails>
              </Accordion>

              <Button variant="contained" type="submit" size="large" sx={{ mt: 4, py: 1.5 }}>
                ส่งข้อมูล
              </Button>

              {submissionStatus === 'success' && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  ส่งข้อมูลฟอร์มสำเร็จ! ขอบคุณสำหรับข้อมูล
                </Alert>
              )}
              {submissionStatus === 'error' && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  เกิดข้อผิดพลาดในการส่งข้อมูล โปรดตรวจสอบข้อมูลและลองอีกครั้ง
                </Alert>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </LocalizationProvider>
  );
}

export default FormDetailPage;