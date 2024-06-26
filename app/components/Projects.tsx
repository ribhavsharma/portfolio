import React, { useEffect, useState, useRef } from "react";
import { GraphQLClient, gql } from "graphql-request";

type Project = {
  id: string;
  name: string;
  url: string;
  description: string;
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const GITHUB_USERNAME = "ribhavsharma";
  const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const endpoint = "https://api.github.com/graphql";
      const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
      });

      const query = gql`
        {
          user(login: "${GITHUB_USERNAME}") {
            pinnedItems(first: 6, types: REPOSITORY) {
              edges {
                node {
                  ... on Repository {
                    id
                    name
                    url
                    description
                  }
                }
              }
            }
          }
        }
      `;

      const data: { user: { pinnedItems: { edges: { node: Project }[] } } } =
        await graphQLClient.request(query);
      const pinnedRepos = data.user.pinnedItems.edges.map(
        (edge: any) => edge.node,
      );

      const updatedRepos = pinnedRepos.map((repo) => {
        if (repo.name === "Pink") {
          return {
            ...repo,
            description:
              "ride sharing services for women with exclusively female drivers",
          };
        } else if (repo.name === "Drocsid") {
          return {
            ...repo,
            description:
              "event ticketing platform built with react and firebase",
          };
        } else if (repo.name === "Gestura") {
          return {
            ...repo,
            description:
              "ASL to spoken language translation, with an interstellar twist",
          };
        }

        else if (repo.name === "MyBlogPost") {
          return {
            ...repo,
            description:
              "blog post website with user authentication and CRUD operations",
          };
        }
        return repo;
      });

      setProjects(updatedRepos);
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const projectCards = container?.querySelectorAll(".project-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    projectCards?.forEach((card) => {
      observer.observe(card);
    });

    return () => {
      projectCards?.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, [projects]);

  return (
    <div ref={containerRef} className="w-[60%] mx-auto">
      <h2
        className="text-3xl font-rebond my-8 text-gray-400"
        style={{ color: "#141414" }}
      >
        Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="project-card p-4 border rounded-xl">
            <img
              src={`https://socialify.git.ci/${project.url.split("https://github.com/")[1]}/image?language=1&owner=1&name=1&stargazers=1&theme=Light`}
              alt=""
            />
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: "#141414" }}
            >
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                {project.name}
              </a>
            </h3>
            <p className="mb-4" style={{ color: "#141414" }}>
              {project.description}
            </p>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#141414" }}
            >
              View Project ↗
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
