<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Question extends Model
{
    protected $fillable = [
        'user_id',
        'qid',
        'title',
        'qdescription',
        'type',
        'question',
        'points',
        'options',
        'answer',
    ];

    protected $casts = [
        'question' => 'array',
        'points' => 'array',
        'options' => 'array',
        'answer' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
