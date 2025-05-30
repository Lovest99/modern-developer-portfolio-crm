<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function home()
    {
        return Inertia::render('Portfolio/Home');
    }

    public function about()
    {
        return Inertia::render('Portfolio/About');
    }

    public function portfolio()
    {
        return Inertia::render('Portfolio/PortfolioPage');
    }

    public function resume()
    {
        return Inertia::render('Portfolio/ResumePage');
    }

    public function contact()
    {
        return Inertia::render('Portfolio/Contact');
    }

    public function welcome()
    {
        return Inertia::render('Welcome');
    }

    public function downloadCV()
    {
        return response()->download(public_path('download/cv.pdf'), 'BrightCheteni-CV.pdf');
    }
}
