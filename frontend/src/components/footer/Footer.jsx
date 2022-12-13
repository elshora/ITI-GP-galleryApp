import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from '../../styles/_footer.module.scss'
export default function Footer() {
    return (
        <>
		<footer id={`${styles.footer}`}>
			<div className="container">
				<div className="row">
					<div className="col-md-4 ">
						<NavLink to="/"><img src="/assets/imgs/ArtStation-logo-horizontal-white.svg" alt="" className="img-fluid logo-footer"/></NavLink>
                      <div className="footer-about  mt-3">
                          <p className='mt-2'>
The largest art market in Egypt and soon it will be in the Middle East
We've been helping artists sell wall art, home decor, apparel, and other products and are home to hundreds of thousands of artists, photographers, graphic designers, illustrators, and iconic brands  </p>
                      </div>

					</div>
					<div className="col-md-2 mt-4">
                <div className={`${styles.useful_link}`}>
							<h2>Useful Links</h2>
							<div className={`${styles.use_links}`}>
								<li><NavLink to="/"><i className="fa-solid fa-angles-right"></i> Home</NavLink></li>
								<li><NavLink to="/about"><i className="fa-solid fa-angles-right"></i> About Us</NavLink></li>
								<li><NavLink to="/shop"><i className="fa-solid fa-angles-right"></i> Shop</NavLink></li>
								<li><NavLink to="/contact"><i className="fa-solid fa-angles-right"></i> Contact</NavLink></li>
							</div>
						</div>

					</div>
                    <div className="col-md-3 mt-4">
                        <div className={`${styles.social_links}`}>
							<h2>Follow Us</h2>
							<div className="social-icons mt-3">
								<li><NavLink to="/contact"><i className="fa-brands fa-facebook-f"/> Facebook</NavLink></li>
								<li><NavLink to="/contact"><i className="fa-brands fa-instagram"/> Instagram</NavLink></li>
								<li><NavLink to="/contact"><i className="fa-brands fa-linkedin-in" /> Linkedin</NavLink></li>
							</div>
						</div>
                    

                    </div>
					<div className="col-md-3 mt-4">
						<div className={`${styles.address}`}>
							<h2>Address</h2>
							<div className={`${styles.address_links}`}>
								<li className="address1"><i className="fa-solid fa-location-dot"/> Cairo / Egypt</li>
								   <li><NavLink to="/contact"><i className="fa-solid fa-phone"/> 010904500112</NavLink></li>
								   <li><NavLink to="/contact"><i className="fa-solid fa-envelope"/> Artmail@artrstation.com</NavLink></li>
							</div>
						</div>
					</div>
                  
				</div>
			</div>

			</footer>
			
		<section id="copy-right">
			<div className={`${styles.copy_right_sec}`}><i className="fa-solid fa-copyright"></i>  
				copyright For ITI Mearn Stack Developers 2022 Q1 Powerd By <a href="#">ITI</a> 


			</div>

		</section>
        </>
    );
};
