<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('questions/index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('questions/create');
    }

    /**
     * Show the form for importing a new resource.
     */
    public function import(): Response
    {
        return Inertia::render('questions/import');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'questions' => 'required|array|min:1|max:20',
            'questions.*.type' => 'required|string|in:multiple-choice,check-box,true-false,enumeration',
            'questions.*.question' => 'required|string',
            'questions.*.points' => 'required|integer|min:1|max:10',
            'questions.*.options' => 'nullable|array',
            'questions.*.enumerationAnswer' => 'nullable|string',
            'questions.*.trueFalseSelected' => 'nullable|string|in:true,false',
            'questions.*.checkboxSelected' => 'nullable|array',
            'questions.*.description' => 'nullable|string',
        ]);

        $questions = [];
        $points = [];
        $options = [];
        $answers = [];

        foreach ($request->questions as $q) {
            $questions[] = $q['question'];
            $points[] = $q['points'];
            $options[] = $q['options'] ?? [];
            $answers[] = $this->formatAnswer($q);
        }

        do {
            $qid = \Illuminate\Support\Str::random(16);
        } while (Question::where('qid', $qid)->exists());

        Question::create([
            'user_id' => Auth::id(),
            'qid' => $qid,
            'title' => $request->title,
            'qdescription' => $request->description,
            'type' => $request->questions[0]['type'], // assuming all same
            'question' => $questions,
            'points' => $points,
            'options' => $options,
            'answer' => $answers,
        ]);

        return redirect()->route('questions_index')->with('success', 'Questions created successfully.');
    }

    private function formatAnswer(array $question): mixed
    {
        return match ($question['type']) {
            'enumeration' => $question['enumerationAnswer'] ?? '',
            'true-false' => $question['trueFalseSelected'] ?? 'true',
            'multiple-choice' => null, // Assuming no pre-selected answer, or handle differently
            'check-box' => $question['checkboxSelected'] ?? [],
            default => null,
        };
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
