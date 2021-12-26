import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Logo from "../public/pylampLogo.png";
import { useState } from 'react';
import YouTube from "@material-ui/icons/YouTube";
import LinkedIn from "@material-ui/icons/LinkedIn";
import Instagram from "@material-ui/icons/Instagram";
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@material-ui/core';
import { Router, useRouter } from 'next/dist/client/router';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import EdiText from 'react-editext';
import { Send } from '@material-ui/icons';
import HomeIcon from "@material-ui/icons/Home";
import RefreshIcon from "@material-ui/icons/Refresh";

export default function AdminPage() {
    const router = useRouter();
    const [sessionTopic,setTopic] = useState({pylampSession:"pylampSession Attendance", solveMe:"Solve Me Attendance", 
    hackerRank:"Hackerrank Attendance", signatureEvent:"signatureEvent Attendance"});
    
    const [aboutSession,setAbout] = useState({pylampSession:"About pylampSession", solveMe:"About Solve Me Session", 
    hackerRank:"About Hackerrank Session", signatureEvent:"About signatureEvent"});
    
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }
    
    const handleOpen = () => {
        setOpen(true);
    }

    const handleSave = (val) => {
        console.log(val);
    }
return (

<div className={styles.adminContainer}>
    <Head>
        <title>Domain Realm</title>
        <meta name="description" content="Web development session" />
        <link rel="icon" href="/pylampLogo.png" />
    </Head>

    <main className={styles.adminMain}>
        <div className={styles.Adminheader}>
            <h1>Pylamp</h1>
            <Button endIcon={<RefreshIcon />} onClick={() => window.location.reload()} />
            <Button  endIcon={<HomeIcon />} onClick={() => router.push("/HomePage")} />
        </div>

        <div className={styles.mainContent}>
            <Image src={Logo} alt="logo" width="150rem" height="150rem" />
            <h1>We Are Here For You!!</h1>
        </div>

        <div >
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                <Grid item xs={12} sm={6} className={styles.cardGrid}>
                    <Card className={styles.adminCard}>
                        <CardContent> 
                            <h3 style={{textAlign:"center", color: "GrayText"}}>Event Details</h3>
                            <EdiText buttonsAlign='before' type="text"  value={sessionTopic.pylampSession} onSave={handleSave} /><hr />
                            <EdiText buttonsAlign='before' type="text"  value={aboutSession.pylampSession} onSave={handleSave} /><br />
                            <Button variant="contained" endIcon={<Send />} className={styles.cardBtn} onClick={() => setOpen(true)}>
                                SET
                            </Button>                        
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} className={styles.cardGrid}>
                    <Card className={styles.adminCard}>
                        <CardContent>
                            <h3 style={{textAlign:"center", color: "GrayText"}}>Event Details</h3>
                            <EdiText buttonsAlign='before' type="text"  value={sessionTopic.solveMe} onSave={handleSave} /><hr />
                            <EdiText buttonsAlign='before' type="text"  value={aboutSession.solveMe} onSave={handleSave} /><br />
                            <Button variant="contained" endIcon={<Send />} className={styles.cardBtn} onClick={() => setOpen(true)}>
                                SET
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} className={styles.cardGrid}>
                    <Card className={styles.adminCard}>
                        <CardContent>
                            <h3 style={{textAlign:"center", color: "GrayText"}}>Event Details</h3>
                            <EdiText buttonsAlign='before' type="text"  value={sessionTopic.hackerRank} onSave={handleSave} /><hr />
                            <EdiText buttonsAlign='before' type="text"  value={aboutSession.hackerRank} onSave={handleSave} /><br />
                            <Button variant="contained" endIcon={<Send />} className={styles.cardBtn} onClick={() => setOpen(true)}>
                                SET
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} className={styles.cardGrid}>
                    <Card className={styles.adminCard}>
                        <CardContent>
                            <h3 style={{textAlign:"center", color: "GrayText"}}>Event Details</h3>
                            <EdiText buttonsAlign='before' type="text" value={sessionTopic.signatureEvent} onSave={handleSave} /><hr />
                            <EdiText buttonsAlign='before' type="text"  value={aboutSession.signatureEvent} onSave={handleSave} /><br />
                            <Button variant="contained" endIcon={<Send />} className={styles.cardBtn} onClick={() => setOpen(true)}>
                                SET
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle className={styles.alertDialogTitle}>
                    Comfirmative dialog!!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are You Sure Ready For The Launch
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus>
                        Launch🚀
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    </main>

    <footer className={styles.footer}>
        <a href="https://www.youtube.com/channel/UCJBaFNQuwfYXHDkICKpMYsg" target="blank"><YouTube  style={{color:'white'}}/></a>
        <a href="https://linkedin.com/in/pylampofficial" target="blank"><LinkedIn style={{color:'white'}}/></a>
        <a href="https://instagram.com/pylamp_official_" target="blank"><Instagram style={{color:'white'}}/></a>
    </footer>
    </div>
  )
}