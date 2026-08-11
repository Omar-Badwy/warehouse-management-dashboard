import { Link, useParams } from "react-router-dom";
import styles from "../styles/errorPage.module.css";

export default function ErrorPage() {

    const {type} = useParams();

    let title;

    if(type === "clients"){
        title = "Client"
    }
    if(type === "categories"){
        title = "Category"
    }

    return (
        <main className={styles.page}>
            <div className={styles.backgroundShapes}>
                <span className={styles.shapeOne} />
                <span className={styles.shapeTwo} />
                <span className={styles.shapeThree} />
                <span className={styles.shapeFour} />
                <span className={styles.shapeFive} />
                <span className={styles.shapeSix} />
                <span className={styles.shapeSeven} />
                <span className={styles.shapeEight} />
            </div>

            <section className={styles.content}>
                <p className={styles.code}>404</p>

                <div className={styles.line} />

                <h1 className={styles.title}>{title} Not Found</h1>

                <p className={styles.description}>
                    Sorry, the page you're looking for doesn't exist
                    or may have been moved.
                </p>

                <Link to={`/${type}`} className={styles.button}>
                    <span>←</span>
                    Back to {type}
                </Link>
            </section>
        </main>
    );
}