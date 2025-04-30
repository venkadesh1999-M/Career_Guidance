import React from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/free-career-guidance.jpg';

function Menupage() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
        <Link className="navbar-brand" to="/">Career Guidance</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" style={{ color: "white" }} to="/register">Sign Up</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{ color: "white" }} to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="d-flex flex-column justify-content-center align-items-center text-center p-4" style={{ minHeight: '20vh' }}>
        <img src={image} alt="Career Guidance" className="img-fluid rounded mb-3" />
        <h2>Start Your Career Journey Today!</h2>
        <p className="lead">Discover your potential with expert guidance and smart tools.</p>
        <Link to="/register" className="btn btn-success mt-2">Get Started</Link>
      </div>

      <div className="container py-5">
        <h3 className="text-center mb-4">Why Career Guidance?</h3>
        <div className="row">
          <div className="col-md-6">
            <p>
              We help students and professionals make informed career choices with personalized tools and AI-powered insights.
            </p>
          </div>
          <div className="col-md-6">
            <ul>
              <li>Skill-based assessments</li>
              <li>Resume builder</li>
              <li>Real-time AI consultation</li>
              <li>Education & training recommendations</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-light py-5">
        <div className="container">
          <h3 className="text-center mb-4">Our Features</h3>
          <div className="row text-center">
            <div className="col-md-4 mb-3">
              <h5>Career Quiz</h5>
              <p>Discover suitable career paths based on your interests and skills.</p>
            </div>
            <div className="col-md-4 mb-3">
              <h5>Resume Builder</h5>
              <p>Create professional resumes in minutes with our easy-to-use tool.</p>
            </div>
            <div className="col-md-4 mb-3">
              <h5>Real-time Guidance</h5>
              <p>Chat with our AI career assistant to get instant advice anytime.</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-primary text-white text-center py-3">
        <p>&copy; 2025 Career Guidance. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Menupage;
