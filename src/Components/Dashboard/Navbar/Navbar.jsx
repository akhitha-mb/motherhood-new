import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <Link class="navbar-brand" to="/">Navbar</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
          <Link class="nav-link" to="/dashboard/health">Health Metrics</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/vcall">Video Call</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/prediction">Prediction</Link>
        </li>

        
        
      </ul>
      {/* Add the avatar here */}
    </div>
  </div>
</nav>
  )
}
