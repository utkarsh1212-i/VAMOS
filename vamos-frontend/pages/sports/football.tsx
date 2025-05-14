import { NextPage } from 'next';
import styles from '../../styles/sports.module.css';
import Navbar from '../../components/Navbar';
import Image from 'next/image';
import router from 'next/router';
import Link from 'next/link';

const Football: NextPage = () => {
  const features = [
    {
      title: 'Manchester United',
      description: 'English professional football club based in Manchester',
      image: '/unitedteam.jpg',
      logo: '/united-logo.svg',
      slug: 'manchester-united',
    },
    {
      title: 'Real Madrid',
      description: 'Spanish professional football club based in Madrid',
      image: '/realmadrid.jpeg',
      logo: '/real-madrid-club-de-futbol.svg',
      slug: 'real-madrid',
    },
    // Add more features as needed
  ];

  return (
    <div className={styles.sportsContainer}>
      <Navbar />
      <button
        className={styles.backButton}
        onClick={() => window.history.back()}
      >
        Back
      </button>

      <h1 className={styles.header}>Football</h1>

      <div className={styles.contentGrid}>
        {features.map((feature, index) => (
          <Link key={index} href={`/chatrooms/${feature.slug}`}>

            <div key={index} className={styles.card}>
              <div className={styles.imageContainer}>
                <Image
                  src={feature.image}
                  alt={feature.title}
                  layout="fill"
                  objectFit="cover"
                  className={styles.image}
                />
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Football;
