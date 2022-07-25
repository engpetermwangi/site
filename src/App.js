import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import "./App.css";

import peter from "./pics/peter.jpg";
import githubLogo from "./pics/github.png";
import linkedinLogo from "./pics/linkedin.png";
import codewarsLogo from "./pics/codewars.png";
import codesandboxLogo from "./pics/codesandbox.svg";
import resume from "./pics/resume.svg";
import resumePDF from "./resume/resume.pdf";

const links = [
  {
    link: "https://github.com/engpetermwangi",
    imageSrc: githubLogo,
    imageAlt: "GitHub logo",
    offset: Math.PI / 2,
  },
  {
    link: "https://www.linkedin.com/in/peter-mwangi-59932bb9/",
    imageSrc: linkedinLogo,
    imageAlt: "LinkedIn logo",
    offset: (9 / 10) * Math.PI,
  },
  {
    link: "https://www.codewars.com/users/engpetermwangi",
    imageSrc: codewarsLogo,
    imageAlt: "Codewars logo",
    offset: (1 / 10) * Math.PI,
  },
  {
    link: "https://codesandbox.io/u/engpetermwangi",
    imageSrc: codesandboxLogo,
    imageAlt: "CodeSandbox logo",
    offset: (13 / 10) * Math.PI,
  },
  {
    link: resumePDF,
    imageSrc: resume,
    imageAlt: "Resume",
    offset: (-3 / 10) * Math.PI,
  },
];

const skills = ["HTML", "CSS", "JavaScript", "React", "Python", "Go", "Kotlin"];

const App = () => {
  return (
    <div className="container">
      <div className="center">
        <img src={peter} alt="Peter" />
        {links.map((linkProps) => (
          <AnimatedLink key={linkProps.link} {...linkProps} />
        ))}
      </div>
      <Skills skills={skills} />
    </div>
  );
};

const AnimatedLink = ({ link, imageSrc, imageAlt, offset }) => {
  const angle = useMotionValue(offset);

  useEffect(() => {
    const controls = animate(angle, 2 * Math.PI + offset, {
      duration: 24,
      repeat: Infinity,
      ease: "linear",
    });
    return controls.stop;
  }, [angle, offset]);

  const x = useTransform(angle, (value) => 180 * Math.cos(value));
  const y = useTransform(angle, (value) => 180 * (1 - Math.sin(value)));

  return (
    <motion.a href={link} className="link" style={{ x, y }} target="_blank">
      <img src={imageSrc} alt={imageAlt} />
    </motion.a>
  );
};

const Skills = ({ skills }) => (
  <div className="skill-container">
    <h2>Backed by:</h2>
    <div className="scrollable">
      {skills.map((skill) => (
        <span className="skill" key={skill}>
          {skill}
        </span>
      ))}
    </div>
  </div>
);

export default App;
