import { useEffect, useState, useRef } from "react";
import logo from "../assets/logo.png";
import hero from "../assets/hero.jpg";

const paragraphs = [
  `Gishmaf Global Concept is a vision-driven platform dedicated to empowering
   individuals and organizations through technology, knowledge, creativity, 
   and innovation. We exist to bridge the gap between ideas and execution 
   by providing solutions that inspire growth, learning, and transformation.`,

  `At Gishmaf, we believe that creativity and technical skill are powerful
   tools for shaping the future. From digital learning, consultancy, 
   media production, publishing, and skill development, we serve as 
   a hub where innovation meets purpose.`,

  `This platform is a reflection of our mission — to provide resources,
   knowledge, and tools that help people unlock their potential, build 
   their skills, and bring their ideas to life in meaningful ways.`
];

const titles = [
  { title: "Innovation", text: "Driving creative solutions through technology." },
  { title: "Knowledge", text: "Sharing information that empowers growth." },
  { title: "Creativity", text: "Turning ideas into impactful realities." },
  { title: "Empowerment", text: "Equipping people with valuable skills." }
];

export default function AboutDisplay() {
  const [text, setText] = useState("");
  const [pIndex, setPIndex] = useState(0);
  const [tIndex, setTIndex] = useState(0);

  const typingRef = useRef(null);
  const timeoutRef = useRef(null);

  /* -------- TYPEWRITER EFFECT -------- */
  useEffect(() => {
    let i = 0;
    const current = paragraphs[pIndex];
    setText("");

    typingRef.current = setInterval(() => {
      setText((prev) => prev + current.charAt(i));
      i++;

      if (i >= current.length) {
        clearInterval(typingRef.current);

        timeoutRef.current = setTimeout(() => {
          setPIndex((prev) => (prev + 1) % paragraphs.length);
        }, 10000);
      }
    }, 25);

    return () => {
      clearInterval(typingRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [pIndex]);

  /* -------- ROTATING TITLES -------- */
  useEffect(() => {
    const rotate = setInterval(() => {
      setTIndex((prev) => (prev + 1) % titles.length);
    }, 4000);

    return () => clearInterval(rotate);
  }, []);

  return (
    <div className="about-display">
      <div className="about-header">
        <img src={logo} alt="logo" className="about-logo" />
        <img src={hero} alt="hero" className="about-me" />
      </div>

      <div className="typewriter">
        {text}
      </div>

      <div className="about-titles">
        <h3>{titles[tIndex].title}</h3>
        <p>{titles[tIndex].text}</p>
      </div>
    </div>
  );
}
