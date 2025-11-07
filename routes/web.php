<?php

use App\Http\Controllers\QuestionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Questions routes
    Route::get('questions', [QuestionController::class, 'index'])->name('questions_index');
    Route::get('questions/create', [QuestionController::class, 'create'])->name('questions_create');
    Route::post('questions', [QuestionController::class, 'store'])->name('questions_store');
    Route::get('questions/import', [QuestionController::class, 'import'])->name('questions_import');

    Route::get('questions/{question}', [QuestionController::class, 'show'])->name('questions_show');
    Route::get('questions/{question}/edit', [QuestionController::class, 'edit'])->name('questions_edit');
    Route::put('questions/{question}', [QuestionController::class, 'update'])->name('questions_update');
    Route::delete('questions/{question}', [QuestionController::class, 'destroy'])->name('questions_destroy');
});

require __DIR__.'/settings.php';
