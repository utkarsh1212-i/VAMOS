import { NextPage } from 'next';
import styles from '../../styles/sports.module.css';
import Navbar from '../../components/Navbar';
import Image from 'next/image';
import router from 'next/router';

const Basketball: NextPage = () => {
    const features = [
      {
        title: 'NBA',
        description: 'Professional basketball league in North America',
        image: '/nba.jpg',
        logo: '/washington-wizards-3.svg', // Add logo here
      },
      {
        title: 'Lakers',
        description: 'Los Angeles Lakers',
        image: '/lakers.webp',
        logo: '/los-angeles-lakers-1.svg', // Add logo here
      },
      // Add more features as needed
    ];
  
    return (
      <div className={styles.sportsContainer}>
        <h1 className={styles.header}>Basketball</h1>

        <button 
        className={styles.chatButton}
        onClick={() => router.push('/rooms')}
      >
        Go to Chat
      </button>
  
        <div className={styles.contentGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.imageContainer}>
                <Image
                  src={feature.image}
                  alt={feature.title}
                  layout="fill"
                  objectFit="cover"
                  className={styles.image}
                />
                {/* Add the logo in the center */}
                <div className={styles.logoContainer}>
                  <Image
                    src={feature.logo}
                    alt={`${feature.title} logo`}
                    width={80}
                    height={80}
                    className={styles.logo}
                  />
                </div>
              </div>
              {/* <h3 className={styles.title}>{feature.title}</h3>
              <p className={styles.description}>{feature.description}</p> */}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Basketball;
  