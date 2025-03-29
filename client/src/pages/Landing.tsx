import { Link } from 'react-router-dom';
import '../assets/styles/Landing.css';

const Landing: React.FC = () => {
    return (
        <div className="landing">
            <header className="hero">
                <h1>Embeddr</h1>
                <p className="tagline">Embed your blogs anywhere, anytime</p>
                <div className="ctaButtons">
                    <Link to="/register" className="primaryButton">
                        Get Started
                    </Link>
                    <Link to="/login" className="secondaryButton">
                        Sign In
                    </Link>
                </div>
            </header>

            <section className="features">
                <h2>Why Choose Embeddr?</h2>
                <div className="featuresGrid">
                    <div className="featureCard">
                        <h3>Easy Integration</h3>
                        <p>Just copy and paste a single line of code to embed your blogs anywhere.</p>
                    </div>
                    <div className="featureCard">
                        <h3>Customizable</h3>
                        <p>Choose from multiple themes and customize the appearance of your embedded blogs.</p>
                    </div>
                    <div className="featureCard">
                        <h3>Secure</h3>
                        <p>Your content is protected with secure authentication and embed tokens.</p>
                    </div>
                    <div className="featureCard">
                        <h3>Analytics</h3>
                        <p>Track views and engagement across all your embedded blogs.</p>
                    </div>
                </div>
            </section>

            <section className="howItWorks">
                <h2>How It Works</h2>
                <div className="steps">
                    <div className="step">
                        <div className="stepNumber">1</div>
                        <h3>Create Your Blog</h3>
                        <p>Write and publish your blog content using our intuitive editor.</p>
                    </div>
                    <div className="step">
                        <div className="stepNumber">2</div>
                        <h3>Select Blogs to Embed</h3>
                        <p>Choose which blogs you want to make available for embedding.</p>
                    </div>
                    <div className="step">
                        <div className="stepNumber">3</div>
                        <h3>Copy Embed Code</h3>
                        <p>Get your unique embed code from the dashboard.</p>
                    </div>
                    <div className="step">
                        <div className="stepNumber">4</div>
                        <h3>Paste & Enjoy</h3>
                        <p>Add the code to any website and watch your blogs appear!</p>
                    </div>
                </div>
            </section>

            <section className="cta">
                <h2>Ready to Get Started?</h2>
                <p>Join thousands of bloggers who trust Embeddr for their content distribution.</p>
                <Link to="/register" className="primaryButton">
                    Create Your Account
                </Link>
            </section>
        </div>
    );
};

export default Landing;
