import Banner from '../components/Banner';
import { Carousel, Row, Col } from 'react-bootstrap';
// import FeaturedCourses from '../components/FeaturedCourses';
// import Highlights from '../components/Highlights';

export default function Home() {

    const data = {
        title: "Welcome to our Fitness Tracker App",
        content: "The best fitness tracker app to stay fit and healthy!",
        destination: "/login",
        buttonLabel: "Start Now"
    }


    return (
        <div className='banner text-center'>
            <Banner data={data}/>
        </div>
  );
}
