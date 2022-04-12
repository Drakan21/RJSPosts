
const About = () => {
    return (
        <main className="aboutView">
            <h2>About</h2>
            <p>A Simple ReactJS project to explore routing and CRUD operations.</p>
            <p>Server designed with NodeJS, and communication is performed via Axios.</p>
            <p>DBase is MongoDB, with Mongoose implementation.</p>
            <p>Application state management with React-Redux.</p>
            <div className="aboutLinks">
                <a href="https://github.com/Drakan21" target="_blank" rel="noreferrer">
                    GitHub
                </a>
                <a href="https://www.twitter.com/drakanion" target="_blank" rel="noreferrer">
                    Twitter
                </a>
            </div>
        </main>
    );
}

export default About;
