import React, { Fragment, useState } from 'react';
import { notification } from "antd";

import styles from './merchantDetails.module.css';
const { isEmpty } = require('lodash');

const MerchantDetailsForm = () => {
    const [restaurantName, setRestaurantName] = useState('');
    const [contactName, setContactName] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [Pincode, setPincode] = useState('');
    const [location, setLocation] = useState('');
    const [website, setWebsite] = useState('');
    const [averageDailyTransactions, setAverageDailyTransactions] = useState('')

    const userNamevalidation = (name) => {
        const regex = /^[a-zA-Z]+[a-zA-Z0-9_.]+$/;
        return regex.test(name);
    };

    const validatePhoneNumber = (phone) => {
        const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return regex.test(phone.trim());
    }

    const successNotification = () => {
        notification.success({
            message: 'inserted',
            description: 'merchant Detais inserted Successfully'
        })
    }

    const warningNotification = () => {
        notification.warning({
            message: 'all field data is mandatory',
            description: 'Please insert all the details'
        });
    }

    const submitformHandler = async (e) => {
        e.preventDefault();
        if (isEmpty(restaurantName && phoneNumber && contactName && Pincode && website && location && averageDailyTransactions)) {
            warningNotification("please enter all the details");
            return;
        }
        const isUserNamevalidated = userNamevalidation(contactName);
        const isPhoneNumberIsValidated = validatePhoneNumber(phoneNumber);

        if (!isUserNamevalidated) {
            notification.error({
                description: "please enter a valid contact name ",
            });
            return;
        }

        if (!isPhoneNumberIsValidated) {
            notification.error({
                description: "please enter a valid phone no",
            });
            return;
        }

        const data = { restaurantName, phoneNumber, contactName, Pincode, website, location, averageDailyTransactions }
        try {
            let result = await fetch('http://localhost:3000/api/merchantDetails/createMerchantData', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Accept": 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            let response = await result.json();

            // localStorage.setItem("merchandetails-info", JSON.stringify(response))
            if (response) {
                successNotification();
                setContactName('');
                setRestaurantName('');
                setphoneNumber('');
                setPincode('');
                setLocation('');
                setWebsite('');
                setAverageDailyTransactions('');
                return;
            }
        }
        catch (err) {
            warningNotification(err);
        }
    }

    return (
        <Fragment>
            <form action="" className={styles.formContainer}>
                <div className={styles.container}>
                    <div className={styles.userContainer}>
                        <label className={styles.label}>contact Name</label>
                        <input
                            className={styles.inputContainer} type="text"
                            name="contactName" value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                        />
                    </div>
                    <div className={styles.userContainer}>
                        <label className={styles.label}>Phone</label>
                        <input
                            className={styles.inputContainer}
                            type="text" name="Phone" value={phoneNumber}
                            onChange={(e) => setphoneNumber(e.target.value)}
                        />
                    </div>
                    <div className={styles.userContainer}>
                        <label className={styles.label}>Restaurant Name</label>
                        <input
                            className={styles.inputContainer}
                            type="text" name="resturant name" value={restaurantName}
                            onChange={(e) => setRestaurantName(e.target.value)}
                        />
                    </div>
                    <div className={styles.userContainer}>
                        <label className={styles.label}>Pincode</label>
                        <input
                            className={styles.inputContainer}
                            type="text" name="Pincode" value={Pincode}
                            onChange={(e) => setPincode(e.target.value)}
                        />
                    </div>
                    <div className={styles.userContainer}>
                        <label className={styles.label}>website</label>
                        <input
                            className={styles.inputContainer}
                            type="text" name="website" value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                    </div>
                    <div className={styles.userContainer}>
                        <label className={styles.label}>location</label>
                        <input
                            className={styles.inputContainer}
                            type="text" name="location" value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div className={styles.userContainer}>
                        <label className={styles.label}>averageDailyTransactions</label>
                        <input
                            className={styles.inputContainer}
                            type="text" name="averageDailyTransactions" value={averageDailyTransactions}
                            onChange={(e) => setAverageDailyTransactions(e.target.value)}
                        />
                    </div>
                    <div className={styles.btnContainer}>
                        <button
                            className={styles.button}
                            type="submit"
                            onClick={submitformHandler}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </Fragment >
    )
}

export default MerchantDetailsForm;