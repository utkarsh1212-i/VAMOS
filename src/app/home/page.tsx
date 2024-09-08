import { SignOut } from "@/components/authButtons/signout";
import Navigation from "@/components/navigation";
import '@/app/globals.css'

import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import { url } from "inspector";
import cricket from '../../../public/cricket.jpg'
import football from '../../../public/football.jpg'
import basketball from '../../../public/pexels-chuck-2820906.jpg'
import basketball2 from '../../../public/pexels-lumierestudiomx-974516.jpg'
import foot from '../../../public/2150845600.jpg'
import tennis from '../../../public/2151190017.jpg'

export default function Home({ children }: { children: React.ReactNode }) {

    const sports = [
        { name: 'Cricket', path: '/sports/cricket', image: cricket },
        { name: 'Football', path: '/sports/football', image: football },
        { name: 'Basketball', path: '/sports/basketball', image: basketball2 },
        { name: 'NBA', path: '/sports/basketball', image: basketball },
        { name: 'Football', path: '/sports/basketball', image: foot },
        { name: 'Tennis', path: '/sports/basketball', image: tennis },
        // Add more sports as needed
    ];

    return (
        <div style={{ background: 'linear-gradient(#000000 , #434343)', height: 'auto' }} >
            <nav>
                <Navigation />
                {/* <nav>About Page Navigation</nav> */}
            </nav>
            <SignOut />
            <div>{children}</div>
            <div className=" p-8">
                <div className="grid grid-cols-3 md:grid-cols-3 gap-12">
                    {/* <div className="flex gap-8"> */}
                    {sports.map((sport, index) => (
                        <div key={index}>

                            <Card
                                className="transform hover:scale-110 transition-transform shadow-xl hover:shadow-xl hover:shadow-lime-300 rounded-xl my-4"
                                style={{
                                    borderRadius: '12px',
                                    perspective: '1000px',
                                    height: '50vh',
                                    backgroundImage: `url(${sport.image.src})`, // Use URL for background image
                                    backgroundRepeat: 'no-repeat', // Prevent image tiling
                                    backgroundPosition: 'center', // Center image
                                    objectFit: 'cover', // Ensure image fills the card
                                    backgroundSize: '140%'
                                }}
                            >
                                <CardActionArea style={{display: 'flex', justifyContent: 'center'}}>
                                    <Link href={sport.path} style={{ alignItems: 'center' }}>
                                        <CardContent
                                            className="text-center p-8"
                                            style={{

                                                borderRadius: '12px',
                                            }}
                                        >
                                            <Typography variant="h5" component="div" className="text-yellow-500 font-extrabold" style={{ fontFamily: 'monospace' }}>
                                                {sport.name}
                                            </Typography>
                                        </CardContent>
                                    </Link>
                                </CardActionArea>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}