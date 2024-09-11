import styles from "@/styles/Panel.module.css";
import {useEffect, useState} from "react";
import AddEmail from "@/components/addEmail";

export default function EmailsPanel({color}) {

  const [emailPopup, setEmailPopup] = useState(false);
  const [emails, setEmails] = useState([]);
  const [loadedEmails, setLoadedEmails] = useState(false);

  useEffect(() => {
    const storedEmails = localStorage.getItem("emails");
    if (storedEmails) {
      const parsedEmails = JSON.parse(storedEmails);
      setEmails(parsedEmails);
    }
    setLoadedEmails(true);
  }, []);

  useEffect(() => {
    loadedEmails && localStorage.setItem("emails", JSON.stringify(emails));
  }, [emails]);

  const addEmail = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    setEmailPopup(false);
    setEmails([...emails, {name: name, email: email}]);
    localStorage.setItem("emails", JSON.stringify(emails));
  };

  return (<>
    <div
      className={styles.subsection}
      style={{background: color}}
    >
      <h2 className={styles.subheader}> Emails </h2>
      <div className={styles.scrollBox}>
        <ul id="emailsList" className={styles.list}>
          {emails && emails.map((item, index) => (<li key={index}>
            <a href={"mailto:" + item.email} target="_blank">
              {item.name}
            </a>
          </li>))}
        </ul>
      </div>
      <button
        className={styles.button}
        onClick={() => setEmailPopup(true)}
      >
        Add Email
      </button>
    </div>
        {emailPopup && (<AddEmail
            closeMethod={() => setEmailPopup(false)}
            addMethod={addEmail}
        />)}
  </>
  );
}