import { Switch } from "@mantine/core"
import styles from "../styles/settings.module.css"
import { useSelector } from "react-redux"
import { useContext } from "react"
import { ModalsContext } from "../providers/modalsProvider"
import { ThemeContext } from "../providers/themeProvider"


export default function Settings () {

    const user = useSelector( (state) => state.auth.user )
    console.log(user)

    const {openModal} = useContext(ModalsContext)

    const {mode,setMode} = useContext(ThemeContext)

    return (
        <>
            <main className={styles.page}>
    
                <div className={styles.header}>
                    <div>
                        <p className={styles.eyebrow}>SYSTEM</p>
                        <h1>Settings</h1>
                        <p>Manage your dashboard preferences and system options.</p>
                    </div>
                </div>
    
                    {/* # user */}
                    <section className={styles.section}>
                        <header className={styles.sectionHeader}>
                            <div className={`${styles.avatar} ${styles.blue}`}>
                                <i style={{color:"#3b82f6"}} className="fa-solid fa-user"></i>
                            </div>

                            <div className={styles.userInfo}>
                                <h2>{user?.name}</h2>
                                <p>{user?.email}</p>
                            </div>
                        </header>
        
                        <div className={styles.card}> 
                             
                            <div className={styles.cardInfo}>
                                <h6>Profile information</h6>
                                <p>Update your name and account details.</p>
                            </div>

                            <div className={styles.editBtn} onClick={ () => openModal("updateUser",user)}>
                                edit
                            </div>
                        </div>
    
                    </section>

                    {/* # theme */}
                    <section className={styles.section}>
                        <header className={styles.sectionHeader}>
                            <div className={`${styles.avatar} ${styles.purple}`}>
                                <i style={{color:"#7c3aed"}} className="fa-solid fa-circle-half-stroke"></i>

                            </div>

                            <div className={styles.userInfo}>
                                <h2>Appearance</h2>
                                <p>Customize how the dashboard looks</p>
                            </div>
                        </header>
        
                        <div className={styles.card}> 
                             
                            <div className={styles.cardInfo}>
                                <h6>Theme</h6>
                                <p>Choose the dashboard theme.</p>
                            </div>

                            <div>
                                <select className={styles.select} value={mode} onChange={(e) => setMode(e.target.value)}>
                                    <option value="ligth">ligth</option>
                                    <option value="dark">dark</option>
                                </select>
                            </div>
                        </div>
    
                    </section>

                    {/* # notifications */}
                    <section className={styles.section}>
                        <header className={styles.sectionHeader}>
                            <div className={`${styles.avatar} ${styles.orange}`}>
                                <i style={{color:"#f59e0b"}} className="fa-solid fa-bell"></i>
                            </div>

                            <div className={styles.userInfo}>
                                <h2>Notifications</h2>
                                <p>Control dashboard notifications.</p>
                            </div>
                        </header>
        
                        <div className={styles.card}> 
                             
                            <div className={styles.cardInfo}>
                                <h6>Low stock alerts</h6>
                                <p>Show an alert when a product reaches a low quantity.</p>
                            </div>

                            <div className={styles.switch}>
                                <Switch defaultChecked size="md" />
                            </div>
                        </div>

                        <div className={styles.card}> 
                             
                            <div className={styles.cardInfo}>
                                <h6>Order status updates</h6>
                                <p>Show notifications when an order status changes</p>
                            </div>

                            <div className={styles.switch}>
                                <Switch defaultChecked size="md" />
                            </div>
                        </div>
    
                    </section>
                    
                    {/* # data */}
                    <section className={styles.section}>
                        <header className={styles.sectionHeader}>
                            <div className={`${styles.avatar} ${styles.green}`}>
                                <i style={{color:"#16a34a"}} className="fa-solid fa-database"></i>
                            </div>

                            <div className={styles.userInfo}>
                                <h2>Data Management</h2>
                                <p>Manage your locally stored dashboard data.</p>
                            </div>
                        </header>
        
                        <div className={styles.card} style={{cursor:"pointer"}} onClick={() => openModal("clearLocaleStorageModal")}> 
                             
                            <div className={styles.cardInfo}>
                                <h6 style={{color:"red"}}>clear local data</h6>
                                <p>Remove all dashboard data stored in the browser.</p>
                            </div>

                            <div className={styles.clearData} onClick={() => openModal("clearLocaleStorageModal")}>
                                <i style={{color:"var(--setting-button-color)"}} className="fa-solid fa-caret-right"></i>
                            </div>
                        </div>
    
                    </section>
    
                    <section className={` ${styles.section} ${styles.logout}`} >
                        
                        <section className={styles.section}>
                            <header className={styles.sectionHeader}>
                                <div className={`${styles.avatar} ${styles.red}`}>
                                    <i style={{color:"#ef4444"}} className="fa-solid fa-lock"></i>
                                </div>

                                <div className={styles.userInfo}>
                                    <h2>Security</h2>
                                    <p>Keep your local dashboard account protected.</p>
                                </div>
                            </header>
            
                            <div className={styles.card} style={{cursor:"pointer"}}> 
                                
                                <div className={styles.changePasswordBtn} onClick={() => openModal("updatePassword")}>
                                    change password
                                </div>
                            </div>
        
                        </section>

                        <section className={styles.section}>
                            <header className={styles.sectionHeader}>
                                <div className={`${styles.avatar} ${styles.red}`}>
                                    <i style={{color:"#ef4444"}} className="fa-solid fa-right-from-bracket"></i>
                                </div>

                                <div className={styles.userInfo}>
                                    <h2>Session</h2>
                                    <p>Sign out from your current dashboard session.</p>
                                </div>
                            </header>
            
                            <div className={styles.card} > 
                                
                                <div className={styles.logoutBtn} onClick={ () => openModal("logout")}>
                                    log out
                                </div>

                            </div>
        
                        </section>

                    </section>
    
            </main>
        </>
    )
}

