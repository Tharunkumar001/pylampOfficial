import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/dist/client/router';
import { Avatar, Box, Button, Card, CardContent, CardHeader, CircularProgress, Grid, Typography,  } from '@material-ui/core';
import { ArrowForwardIos } from '@material-ui/icons';
import { DataGrid } from '@material-ui/data-grid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import cookie from 'react-cookies'
import { Stack } from 'react-bootstrap';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



const columns = [
    {
        field: 'eventName',
        headerName: 'Event Name',
        width: 200,
        editable: true,
    },

    {
        field: 'period',
        headerName: 'Event Date',
        width: 200,
        editable: true,
    },
    {
        field: 'participation',
        headerName: 'Participation',
        width: 200,
        editable: true,
    },
];

export default function ProfilePage() {
    const [row, setRow] = useState([]);
    const [user, setUser] = useState({userName: "", userRollNo: ""});
    const [barData, setBar] = useState({Event:"", Active:""});
    const [circulatBar, setData] = useState({percent:"0"});
    const router = useRouter();

    const data = [
        {
            Event: `${barData.Event}`,
            Active: `${barData.Active}`,
        },
    ]

    useEffect(() => {
        (async() => {
            const jwtApi = await axios.put("https://pylamp-domain-realm.vercel.app/api/profileHandler",{jwt: cookie.load("jwt")})
            const statsApi = await axios.get("https://pylamp-domain-realm.vercel.app/api/profileApi");
            try {
                const tableApi = await axios.post("https://pylamp-domain-realm.vercel.app/api/profileApi",{rollNo: jwtApi.data.user});
                setUser({...user, userName: tableApi.data.userDetails[0].UserName, userRollNo: tableApi.data.userDetails[0].RollNo});
                setBar({...barData,Event: statsApi.data, Active: tableApi.data.tableData.length});

                var expRows = [];
                let data = tableApi.data.tableData;
                
                var divide = (barData.Event) / (barData.Active);
                const Avg = Math.floor(100/divide);
                setData({...circulatBar, percent: Avg});

                if(tableApi.status == 200){
                    data.map((value,index) => {
                        expRows.push(
                            { id: value._id, eventName: value.eventName, participation: "✅"},
                        )           
                    });
                    setRow(expRows.reverse());
                }


            } catch (error) {
                console.log(error)
            }
        })();
    },[circulatBar])
return (
    <div>
        <Head>
            <title>Domain Realm</title>
            <meta name="description" content="Web development session" />
            <link rel="icon" href="/pylampLogo.png" />
        </Head>

        <div className={styles.profileDiv}>
            <Card className={styles.profileCard}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe">
                            {user.userName[0]}
                        </Avatar>
                    }
                />
                <Typography style={{fontWeight:"bold",fontSize:"1rem"}}>{user.userName}</Typography>
                <Typography style={{fontWeight:"lighter",opacity:"0.8"}}>{user.userRollNo}</Typography>
                
                <CardContent>
                    <Button variant="outlined" endIcon={<ArrowForwardIos />} 
                    style={{backgroundColor:"#0168FE", borderRadius:"1rem", color:"white"}}
                    >
                        Edit Profile</Button>
                </CardContent>

                <CardContent className={styles.profileSegment}>
                    Events
                </CardContent>

                <CardContent style={{width:'100%', paddingTop:"1rem"}}>
                    <DataGrid 
                        rows={row} 
                        columns={columns} 
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        autoHeight={true}
                        autoPageSize={true}
                        checkboxSelection={false}
                        components={{
                            NoRowsOverlay: () => (
                                <Stack height="100%" alignItems="center" justifyContent="center">
                                    No rows in DataGrid
                                </Stack>
                            )
                        }}
                    />
                </CardContent>

                <CardContent className={styles.profileSegment}>
                    Stats
                </CardContent>

                <CardContent style={{width:"100%"}}>
                <Grid container spacing={2}>
                        <Grid xs={12} md={6} sm={6} style={{
                            display:"flex",
                            justifyContent:"center",
                            paddingBottom:"2rem"
                        }}>
                                <BarChart
                                    width={300}
                                    height={300}
                                    data={data}
                                    >
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Active" fill="#3581EB" />
                                    <Bar dataKey="Event" fill="#6c757a" />
                                </BarChart>
                        </Grid><br /><br />

                        <Grid xs={12} md={6} sm={6} style={{
                            display:"flex",
                            justifyContent:"center",
                            flexDirection:"column"
                        }}>
                        <div style={{ width: 100, height: 100 }}>
                            <CircularProgressbar 
                                value={circulatBar.percent} 
                                text={`${circulatBar.percent}%`}
                            />
                        </div>
                        <h5>You should have above 40% participation.</h5>
                        <h5 style={{
                            color: "grey",
                            opacity: "0.8",
                            fontWeight: "bolder",
                        }}>
                            (below 40% you cant be a member of Pylamp)
                        </h5>
                        </Grid> 
                    </Grid>
                </CardContent>
            </Card><br />
        </div>
    </div>
)
}