import { NextPage } from 'next';
import styles from '../../styles/sports.module.css';
import Navbar from '../../components/Navbar';
import Image from 'next/image';
import router from 'next/router';
import Link from 'next/link';

const Cricket: NextPage = () => {
  const features = [
    {
        title: 'India',
        description: 'Indian national cricket team, representing India in international cricket.',
        image: '/indian-cricket.png',
        logo: '/bcci-seeklogo.png',
        slug: 'india',
    },
    {
        title: 'Australia',
        description: 'Australian national cricket team, representing Australia in international cricket.',
        image: '/australia.jpg',
        logo: '/Cricket-Australia.svg',
        slug: 'australia',
    },
    {
        title: 'Mumbai Indians',
        description: 'Franchise cricket team representing Mumbai in the Indian Premier League.',
        image: '/mumbaiindians.jpg',
        logo: '/mumbai-indians-seeklogo.png',
        slug: 'mumbai-indians',
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

      <h1 className={styles.header}>Cricket</h1>

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

export default Cricket;
