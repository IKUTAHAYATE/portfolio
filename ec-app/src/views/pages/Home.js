import { Link } from 'react-router-dom';
const Home = () => {
    return (
      	<>
			<h1>Homeページです</h1>
			<Link to="/list">Listページ</Link>
			<Link to="/detail">Detailページ</Link>
      	</>
    );
  };
  
export default Home;