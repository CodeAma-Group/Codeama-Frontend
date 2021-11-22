export interface sampleData {
    name:string;
    description:string;
    route:string;
    usefulWords:string[];
}

export const filterWords:sampleData[] = [
    {
        route: "/app/hood",
        name: "Home", 
        description: "Home page of the application",
        usefulWords: ["articles", "home", "dashboard"]
    },
    {
        route: "/app/hood/Questions",
        name: "Questions", 
        description: "See questions asked to amas",
        usefulWords: ["questions"]
    },
    {
        route: "/app/hood/bugs",
        name: "Solved Bugs", 
        description: "See solved bugs",
        usefulWords: ["solve", "bugs"]
    },
    {
        route: "/app/hood/resources",
        name: "Resources", 
        description: "great resources recommended by amas.",
        usefulWords: ["resources"]
    },
    {
        route: "/app/projects",
        name: "Projects", 
        description: "See projects students are already working on",
        usefulWords: ["project"]
    },
    {
        route: "/app/challenges",
        name: "Challenge", 
        description: "See current challenge",
        usefulWords : ["challenge"]
    },
    {
        route: "/app/codeamas",
        name: "Codeama", 
        description: "Top amas who have answered many questions",
        usefulWords : ["resources"]
    },
    {
        route: "/app/support",
        name: "Support", 
        description: "Answers of Questions you might have",
        usefulWords : ["about", "face", "recognition", "security", "how"]
    },
    {
        route: "/app/notifications",
        name: "Notifications", 
        description: "Notifications you have",
        usefulWords : ["notifications"]
    }
]