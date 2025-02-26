"use client"

import React from 'react'
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  Avatar, 
  Chip,
  LinearProgress,
  // ThemeProvider,
  // createTheme,
} from '@mui/material'
import { styled } from '@mui/system'
import { 
  Code as CodeIcon, 
  Storage as StorageIcon, 
  Brush as BrushIcon, 
  Speed as SpeedIcon 
} from '@mui/icons-material'
import { useTheme } from "@emotion/react";
// import { teal } from '@mui/material/colors'


// Styled components

export default function About() {
    const theme = useTheme();
    
    const StyledPaper = styled(Paper)(({ theme }) => ({
      padding: theme.spacing(3),
      textAlign: 'center',
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: theme.shadows[4],
      },
    }))
    
    const SkillChip = styled(Chip)(({ theme }) => ({
      margin: theme.spacing(0.5),
    }))

    const skills = [
        { name: 'React', level: 90 },
        { name: 'Redux', level: 85 },
        { name: 'Tailwind CSS', level: 80 },
        {name: 'Firebase', level: 75 },
        { name: 'Material-UI', level: 85 },
  ]

  return (
      <Box 
        sx={{ 
          minHeight: '100vh',
          bgcolor: 'background.default',
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Header */}
            <Grid item xs={12}>
              <Typography variant="h2" align="center" gutterBottom>
                Merhaba, ben Rabia
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Frontend Geliştirici & UI/UX Meraklısı
              </Typography>
            </Grid>

            {/* Avatar */}
            <Grid item xs={12} md={4}>
              <Box display="flex" justifyContent="center">
                <Avatar
                  alt="Rabia"
                  src="/placeholder.svg?height=200&width=200"
                  sx={{ width: 200, height: 200, mb: 2 }}
                />
              </Box>
              <Typography variant="body1" align="center" paragraph>
                Modern web teknolojileri ile kullanıcı dostu arayüzler geliştirmeyi seviyorum.
              </Typography>
            </Grid>

            {/* Skills */}
            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ p: 3, bgcolor: theme.palette.secondary.main}}>
                <Typography variant="h6" gutterBottom>
                  Yeteneklerim
                </Typography>
                {skills.map((skill) => (
                  <Box key={skill.name} sx={{ my: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">{skill.name}</Typography>
                      <Typography variant="body2">{skill.level}%</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={skill.level} 
                      sx={{ 
                        backgroundColor: theme.palette.secondary.main,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: theme.palette.primary.main,
                        }
                      }} 
                    />
                  </Box>
                ))}
              </Paper>
            </Grid>

            {/* Tech stack */}
            <Grid item xs={12}>
              <Typography variant="h4" align="center" gutterBottom>
                Teknoloji Yığınım
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1, my: 2 }}>
                <SkillChip icon={<CodeIcon />} label="React" sx={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.main }} />
                <SkillChip icon={<StorageIcon />} label="Redux" sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.secondary.main }} />
                <SkillChip icon={<BrushIcon />} label="Tailwind CSS" sx={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.main }} />
                <SkillChip icon={<StorageIcon />} label="Firebase" sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.secondary.main }} />
                <SkillChip icon={<BrushIcon />} label="Material-UI" sx={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.main }} />
              </Box>
            </Grid>

            {/* Features */}
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <StyledPaper elevation={3}>
                    <CodeIcon sx={{ fontSize: 40, mb: 2, color: theme.palette.primary.main }} />
                    <Typography variant="h6" gutterBottom>
                      Modern React
                    </Typography>
                    <Typography variant="body2">
                      Hooks ve fonksiyonel komponentler ile temiz ve etkili kod.
                    </Typography>
                  </StyledPaper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StyledPaper elevation={3}>
                    <StorageIcon sx={{ fontSize: 40, mb: 2, color: theme.palette.primary.main }} />
                    <Typography variant="h6" gutterBottom>
                      State Yönetimi
                    </Typography>
                    <Typography variant="body2">
                      Redux ile karmaşık uygulama durumlarını yönetme.
                    </Typography>
                  </StyledPaper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StyledPaper elevation={3}>
                    <BrushIcon sx={{ fontSize: 40, mb: 2, color: theme.palette.primary.main }} />
                    <Typography variant="h6" gutterBottom>
                      Responsive Tasarım
                    </Typography>
                    <Typography variant="body2">
                      Tailwind ve MUI ile her cihaza uyumlu arayüzler.
                    </Typography>
                  </StyledPaper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StyledPaper elevation={3}>
                    <SpeedIcon sx={{ fontSize: 40, mb: 2, color: theme.palette.primary.main }} />
                    <Typography variant="h6" gutterBottom>
                      Performans Odaklı
                    </Typography>
                    <Typography variant="body2">
                      Hızlı yüklenen ve akıcı çalışan web uygulamaları.
                    </Typography>
                  </StyledPaper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
  )
}