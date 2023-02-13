import style from '../Home/Home.module.scss'

const Home = () => {
    return (
        <div className={style.container}>
            <h1 className={style.header}>Welcome to the Ultimate Blog!</h1>
            <p>
                Have you ever thought about a place to entertain yourself by reading other people's stories <br />
                and maybe share some of yor own? This it it then! <br /> <br />
                Click on the Posts section at the top of this page to start reading and sharing. Don't forget <br />
                to add a link to a fun picture when creating a new story. We like to keep things lively here. <br />
                Feel free to comment posts - but don't forget to be civil! All comments are anonymous and <br />
                you don't have to provide any alias.
            </p>
        </div>
      
    );
  };
  

  export default Home