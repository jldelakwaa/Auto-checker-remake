<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('qid')->unique();
            $table->string('title');
            $table->text('qdescription')->nullable();
            $table->string('type'); // multiple-choice, check-box, true-false, enumeration
            $table->json('question'); // array of questions
            $table->json('points'); // array of points
            $table->json('options')->nullable(); // array of options arrays for multiple-choice and check-box
            $table->json('answer')->nullable(); // array of answers
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
