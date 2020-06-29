import React, { useState } from 'react';
import Modal from 'components/modal';
import LanguageSelect from 'components/language-selector';
import HotspotsList from 'components/hotspots-list';
import logo from './mangrove-alliance.png';

import styles from './style.module.scss';

const NavMenu = () => {
  const [isOpen, toggleModal] = useState(false);
  const [welcomeContent, toggleContent] = useState(false);

  const handleClick = () => {
    toggleModal(!isOpen);
  };

  const handleContent = () => {
    toggleContent(!welcomeContent);
  }

  return (
    <div className={styles.navMenu}>
      <button type="button" onClick={handleClick} className={styles.navMenu} />
      <Modal
        isOpen={isOpen}
        onRequestClose={() => toggleModal(false)}
      >
        <div className={styles.modalContent}>
          <h3>Global Mangrove Watch</h3>
          {welcomeContent ? (
            <div className={styles.introModalContent}>
              <p>Lorem ipsum dolor sit amet, casius ariza inga tesebe consectetur adipiscing elit.
              Aenean lacinia bibendum nulla sed. Maecenas sed diam eget risus varius blandit sit amet non magna caceres.
              Maecenas sed diam eget risus varius blandit sit amet non magna caceres.  Sociis natoque penatibus et magnis dis lalinos parturient montes, nascetur ridiculus mus.</p>
              <a className={styles.welcomeLink} href="http://www.mangrovealliance.org/" target="_blank" rel="noopener noreferrer">Learn more about Mangroves Atlas</a>
              <a className={styles.welcomeLink} href="http://www.mangrovealliance.org/" target="_blank" rel="noopener noreferrer">Visit Global Mangrove Alliance website</a>
              <HotspotsList />
            </div>
          )
            : (
              <>
                <ul>
                  <li className={styles.menuItem}>
                    About Mangrove Atlas
                  </li>
                  <li className={styles.menuItem}>
                    <button type="button" onClick={handleContent}>
                      Welcome to Global Mangrove Watch
                    </button>
                  </li>
                  <li className={styles.menuItem}>
                    <a href="http://www.mangrovealliance.org/" target="_blank" rel="noopener noreferrer">
                      Global Mangrove Alliance
                    </a>
                  </li>
                  <li className={styles.menuItem}>
                    <a href="http://www.mangrovealliance.org/mangrove-knowledge/" target="_blank" rel="noopener noreferrer">
                      About
                    </a>
                  </li>
                  <li className={styles.menuItem}>
                    <a href="http://www.mangrovealliance.org/mangrove-forests/" target="_blank" rel="noopener noreferrer">
                      Mangroves
                    </a>
                  </li>
                  <li className={styles.menuItem}>
                    <a href="hhttp://www.mangrovealliance.org/initiatives/" target="_blank" rel="noopener noreferrer">
                      Initiatives
                    </a>
                  </li>
                  <li className={styles.menuItem}>
                    <a href="http://www.mangrovealliance.org/news/" target="_blank" rel="noopener noreferrer">
                      News
                    </a>
                  </li>
                  <li className={styles.menuItem}>
                    <a href="http://www.mangrovealliance.org/resources/" target="_blank" rel="noopener noreferrer">
                      Resources
                    </a>
                  </li>
                  <li className={styles.menuItem}>
                    <a href="http://www.mangrovealliance.org/contact/" target="_blank" rel="noopener noreferrer">
                      Contact
                    </a>
                  </li>
                </ul>
                <aside className={styles.footer}>
                  <a href="http://www.mangrovealliance.org/" target="_blank" rel="noopener noreferrer">
                    <img src={logo} className={styles.logo} alt="Global Mangrove Alliance" />
                  </a>
                  <LanguageSelect />
                </aside>
              </>)}
        </div>
      </Modal>
    </div>
  );
};


export default NavMenu;