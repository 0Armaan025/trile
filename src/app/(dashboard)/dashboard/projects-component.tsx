interface ProjectTileProps {
    title: string;
    createdAt: string;
}

const Projects = [
    {
        title: "Project 1",
        createdAt: "2023-10-01",
    },
    {
        title: "Project 2",
        createdAt: "2023-10-02",
    },
    {
        title: "Project 3",
        createdAt: "2023-10-03",
    },
    {
        title: "Project 4",
        createdAt: "2023-10-04",
    },
];

export const ProjectsComponent = () => {
    return (
        <div className="projectsComponent">
            {Projects.map((project, index) => (
                <ProjectTile key={index} title={project.title} createdAt={project.createdAt} />
            ))}
        </div>
    );
}



const ProjectTile = ({ title, createdAt }: ProjectTileProps) => {
    return (
        <div className="flex flex-col justify-start items-center my-4 cursor-pointer hover:scale-105 transition-all">
            <div className="flex flex-col justify-start items-start bg-gray-800 rounded-lg p-4 w-full">
                <h4 className="text-lg font-semibold">{title}</h4>
                <p className="text-gray-400 text-sm">Created at: {createdAt}</p>
            </div>
        </div>
    );
}