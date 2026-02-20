import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaEnvelope, 
  FaCode, 
  FaLaptopCode,
  FaServer,
  FaMobile,
  FaDatabase,
  FaCloud,
  FaExternalLinkAlt 
} from 'react-icons/fa';

const theme = {
  colors: {
    primary: '#FF6B00',
    secondary: '#FF8C00',
    dark: '#0A0A0A',
    lightDark: '#1A1A1A',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    accent: '#FF6B00'
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px'
  }
};

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: ${theme.colors.dark};
    color: ${theme.colors.text};
    line-height: 1.6;
    overflow-x: hidden;
  }

  ::selection {
    background: ${theme.colors.primary};
    color: ${theme.colors.dark};
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.dark};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.secondary};
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Section = styled.section`
  padding: 100px 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
`;

const GradientText = styled.span`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Button = styled(motion.button)`
  padding: 12px 30px;
  background: ${props => props.outline ? 'transparent' : props.theme.colors.primary};
  color: ${props => props.outline ? props.theme.colors.primary : props.theme.colors.dark};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 20px;

  &:hover {
    background: ${props => props.outline ? props.theme.colors.primary : 'transparent'};
    color: ${props => props.outline ? props.theme.colors.dark : props.theme.colors.primary};
  }
`;

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${props => props.scrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent'};
  backdrop-filter: blur(10px);
  z-index: 1000;
  padding: 20px 0;
  transition: all 0.3s ease;
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 30px;
  align-items: center;
`;

const NavLink = styled.a`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 20px;
  line-height: 1.2;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 36px;
  }
`;

const Subtitle = styled.h2`
  font-size: 24px;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 30px;
  font-weight: 400;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    justify-content: center;
  }
`;

const SocialIcon = styled.a`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.theme.colors.lightDark};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.text};
  font-size: 24px;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.dark};
    transform: translateY(-5px);
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 30px;
`;

const TechBadge = styled(motion.span)`
  padding: 8px 20px;
  background: ${props => props.theme.colors.lightDark};
  border-left: 3px solid ${props => props.theme.colors.primary};
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.colors.textSecondary};
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-top: 50px;
`;

const ProjectCard = styled(motion.div)`
  background: ${props => props.theme.colors.lightDark};
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-10px);
  }
`;

const ProjectImage = styled.div`
  height: 200px;
  background: linear-gradient(45deg, ${props => props.theme.colors.dark}, ${props => props.theme.colors.lightDark});
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ProjectContent = styled.div`
  padding: 25px;
`;

const ProjectTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
  color: ${props => props.theme.colors.text};
`;

const ProjectDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 14px;
  margin-bottom: 20px;
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const ProjectTechItem = styled.span`
  padding: 5px 10px;
  background: ${props => props.theme.colors.dark};
  border-radius: 3px;
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const ProjectLink = styled.a`
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 50px;
`;

const SkillCategory = styled.div`
  background: ${props => props.theme.colors.lightDark};
  padding: 30px;
  border-radius: 10px;
`;

const SkillCategoryTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
  color: ${props => props.theme.colors.primary};
`;

const SkillItem = styled.div`
  margin-bottom: 15px;
`;

const SkillName = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  color: ${props => props.theme.colors.textSecondary};
`;

const SkillBar = styled.div`
  height: 8px;
  background: ${props => props.theme.colors.dark};
  border-radius: 4px;
  overflow: hidden;
`;

const SkillProgress = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  width: ${props => props.width}%;
`;

const ContactForm = styled.form`
  max-width: 600px;
  margin: 50px auto 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  background: ${props => props.theme.colors.lightDark};
  border: 1px solid transparent;
  border-radius: 5px;
  color: ${props => props.theme.colors.text};
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  background: ${props => props.theme.colors.lightDark};
  border: 1px solid transparent;
  border-radius: 5px;
  color: ${props => props.theme.colors.text};
  font-size: 16px;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Footer = styled.footer`
  background: ${props => props.theme.colors.lightDark};
  padding: 30px 0;
  text-align: center;
`;

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [heroRef, heroInView] = useInView({ threshold: 0.3 });
  const [projectsRef, projectsInView] = useInView({ threshold: 0.3 });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.3 });
  const [contactRef, contactInView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      title: 'Weather Application',
      description: 'Real-time weather tracking app with detailed forecasts and interactive maps using OpenWeatherAPI.',
      tech: ['Dart','OpenWeatherAPI', 'Flutter'],
      github: 'https://github.com/Drishty-Hasija/weather-app',
      live: '#'
    },
    {
      title: 'Image Compressor',
      description: 'This application compresses the size of the image without losing the quality of the image.',
      tech: ['Dart', 'Flutter', 'Flutter Image Compress'],
      github: 'https://github.com/Drishty-Hasija/image-compressor',
      live: '#'
    },
    {
      title: 'Portfolio Website',
      description: 'This is a portfolio website built using react, showcasing my projects, skills, and experience in a visually appealing way.',
      tech: ['React.js', 'Tailwind', 'Typescript'],
      github: 'https://github.com/Drishty-Hasija/portfolio',
      live: '#'
    },
    {
      title: 'Helping Hand',
      description: 'An application created using flutter and python it is used to help the mute and blind people.',
      tech: ['dart', 'Flutter', 'Python', 'FastAPI', 'Torch'],
      github: 'https://github.com/Drishty-Hasija/helping-hand',
      live: '#'
    }
  ];

  const skills = {
    frontend: [
      { name: 'React.js', level: 60 },
      { name: 'UI/UX Design', level: 85 },
      { name: 'Flutter', level: 75 },
    ],
    backend: [
      { name: 'Python', level: 78 },
    ],
    database: [
      { name: 'MySQL', level: 65 },
    ]
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      
      <Navbar scrolled={scrolled}>
        <Container>
          <NavLinks>
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#projects">Projects</NavLink>
             <NavLink href="#skills">Skills</NavLink> 
            <NavLink href="#contact">Contact</NavLink>
          </NavLinks>
        </Container>
      </Navbar>

      <Section id="home" ref={heroRef}>
        <Container>
          <HeroContent>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <Title>
                Hi, I'm <GradientText>Drishty Hasija</GradientText>
              </Title>
              <Subtitle>
                UI/UX Designer and App Development Enthusiast
              </Subtitle>
              <p style={{ color: theme.colors.textSecondary, marginBottom: '30px' }}>
               UI/UX designer and app development enthusiast focused on building intuitive, 
               user-centered digital experiences. Skilled in translating ideas into clean 
               interfaces using modern design principles and emerging technologies.
              </p>
              <div>
               <Button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  document.getElementById("projects")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                View Projects
              </Button>
               <a
                href="/resume.pdf"
                download
                style={{ textDecoration: "none" }}
              >
                <Button
                  outline
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download Resume
                </Button>
              </a>
              </div>
              <SocialLinks>
                <SocialIcon href="https://github.com/Drishty-Hasija"><FaGithub /></SocialIcon>
                <SocialIcon href="https://www.linkedin.com/in/drishty-hasija/"><FaLinkedin /></SocialIcon>
               {/* <SocialIcon href="#"><FaTwitter /></SocialIcon>
                <SocialIcon href="#"><FaEnvelope /></SocialIcon> */}
              </SocialLinks>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
            >
              <TechStack>
                <TechBadge
                  whileHover={{ x: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  Flutter
                </TechBadge>
                <TechBadge
                  whileHover={{ x: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  Figma
                </TechBadge>
                <TechBadge
                  whileHover={{ x: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  React.js
                </TechBadge>
                <TechBadge
                  whileHover={{ x: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  Python
                </TechBadge>
              </TechStack>
            </motion.div>
          </HeroContent>
        </Container>
      </Section>

      <Section id="projects" ref={projectsRef} style={{ background: theme.colors.lightDark }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>
              Featured <GradientText>Projects</GradientText>
            </h2>
            <p style={{ color: theme.colors.textSecondary, maxWidth: '600px' }}>
              Real-world solutions that demonstrate my expertise web development, app development and UI/UX design, showcasing a blend of creativity and technical skill to solve complex problems.
            </p>
            <ProjectGrid>
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <ProjectImage>
                    <FaLaptopCode size={48} color={theme.colors.primary} />
                  </ProjectImage>
                  <ProjectContent>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectDescription>{project.description}</ProjectDescription>
                    <ProjectTech>
                      {project.tech.map((tech, i) => (
                        <ProjectTechItem key={i}>{tech}</ProjectTechItem>
                      ))}
                    </ProjectTech>
                    <ProjectLinks>
                      <ProjectLink href={project.github}>
                        <FaGithub /> Code
                      </ProjectLink>
                      <ProjectLink href={project.live}>
                        <FaExternalLinkAlt /> Live Demo
                      </ProjectLink>
                    </ProjectLinks>
                  </ProjectContent>
                </ProjectCard>
              ))}
            </ProjectGrid>
          </motion.div>
        </Container>
      </Section>

       <Section id="skills" ref={skillsRef}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 style={{ fontSize: '36px', marginBottom: '20px', textAlign: 'center' }}>
              Technical <GradientText>Expertise</GradientText>
            </h2>
            <p style={{ color: theme.colors.textSecondary, textAlign: 'center', marginBottom: '50px' }}>
              Comprehensive skill set across the full development lifecycle
            </p>
            <SkillsGrid>
              <SkillCategory>
                <SkillCategoryTitle>Frontend</SkillCategoryTitle>
                {skills.frontend.map((skill, index) => (
                  <SkillItem key={index}>
                    <SkillName>
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </SkillName>
                    <SkillBar>
                      <SkillProgress
                        initial={{ width: 0 }}
                        animate={skillsInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </SkillBar>
                  </SkillItem>
                ))}
              </SkillCategory>
              
              <SkillCategory>
                <SkillCategoryTitle>Backend</SkillCategoryTitle>
                {skills.backend.map((skill, index) => (
                  <SkillItem key={index}>
                    <SkillName>
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </SkillName>
                    <SkillBar>
                      <SkillProgress
                        initial={{ width: 0 }}
                        animate={skillsInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </SkillBar>
                  </SkillItem>
                ))}
               </SkillCategory>
              
             {/* <SkillCategory>
                <SkillCategoryTitle>DevOps</SkillCategoryTitle>
                {skills.devops.map((skill, index) => (
                  <SkillItem key={index}>
                    <SkillName>
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </SkillName>
                    <SkillBar>
                      <SkillProgress
                        initial={{ width: 0 }}
                        animate={skillsInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </SkillBar>
                  </SkillItem>
                ))}
              </SkillCategory> */}
              
              <SkillCategory>
                <SkillCategoryTitle>Database</SkillCategoryTitle>
                {skills.database.map((skill, index) => (
                  <SkillItem key={index}>
                    <SkillName>
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </SkillName>
                    <SkillBar>
                      <SkillProgress
                        initial={{ width: 0 }}
                        animate={skillsInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </SkillBar>
                  </SkillItem>
                ))}
              </SkillCategory>
            </SkillsGrid>
          </motion.div>
        </Container>
      </Section> 
      
      <Section id="contact" ref={contactRef} style={{ background: theme.colors.lightDark }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ fontSize: '36px', marginBottom: '20px', textAlign: 'center' }}>
              Let's <GradientText>Connect</GradientText>
            </h2>
            <p style={{ color: theme.colors.textSecondary, textAlign: 'center', marginBottom: '50px' }}>
              Interested in collaborating? Let's discuss your next project.
            </p>
            <ContactForm>
              <Input type="text" placeholder="Name" />
              <Input type="email" placeholder="Email" />
              <Input type="text" placeholder="Subject" />
              <TextArea placeholder="Message" />
              <Button
                type="submit"
                style={{ width: '100%', marginRight: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </Button>
            </ContactForm>
          </motion.div>
        </Container>
      </Section>

      <Footer>
        <Container>
          <p style={{ color: theme.colors.textSecondary }}>
            © 2026 Drishty Hasija. All rights reserved.
          </p>
        </Container>
      </Footer>
    </ThemeProvider>
  );
}

export default App;