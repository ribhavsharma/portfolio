import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faJava,
  faPython,
  faJs,
  faHtml5,
  faCss3Alt,
  faReact,
  faNodeJs,
  faPhp,
  faGit,
  faDocker,
  faFigma,
  faWordpress,
  faBootstrap,
  faVuejs,
} from "@fortawesome/free-brands-svg-icons";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@nextui-org/tooltip";

const skills = [
  { name: "Java", icon: faJava },
  { name: "Python", icon: faPython },
  { name: "JavaScript", icon: faJs },
  { name: "HTML", icon: faHtml5 },
  { name: "CSS", icon: faCss3Alt },
  { name: "React", icon: faReact },
  { name: "Node.js", icon: faNodeJs },
  { name: "PHP", icon: faPhp },
  { name: "SQL", icon: faDatabase },
  { name: "Git", icon: faGit },
  { name: "Docker", icon: faDocker },
  { name: "Figma", icon: faFigma },
  { name: "WordPress", icon: faWordpress },
  { name: "Bootstrap", icon: faBootstrap },
  { name: "VueJS", icon: faVuejs },
];

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const rows = container?.querySelectorAll(".skill-row");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    rows?.forEach((row) => {
      observer.observe(row);
    });

    return () => {
      rows?.forEach((row) => {
        observer.unobserve(row);
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="py-10 flex flex-col items-stretch w-[80%] md:w-[60%] mx-auto"
    >
      <h2 className="text-3xl font-rebond my-8 text-[#141414]">Skills</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className={`skill-row flex items-center justify-center p-4 rounded-[16px] border opacity-0 transition-opacity duration-700 delay-${index * 100}`}
            style={{ aspectRatio: "1/1" }}
          >
            <Tooltip
              key={skill.name}
              content={skill.name}
              showArrow
              placement="bottom"
              classNames={{
                base: ["before:bg-black dark:before:bg-white"],
                content: [
                  "py-2 px-4 shadow-xl",
                  "text-black bg-gradient-to-br from-white to-neutral-400",
                  "rounded-xl",
                ],
              }}
            >
              <FontAwesomeIcon
                icon={skill.icon}
                className="text-[#141414] mx-auto"
                size="2x"
              />
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
