import { Schema, model } from 'mongoose';

export const Properties = {
    id: { type: String },
    iid: { type: String },
    project_id: { type: String },
    title: { type: String },
    description: { type: String },
    state: { type: String },
    created_at: { type: Date },
    updated_at: { type: Date },
    closed_at: { type: Date }, 
    milestone: { type: Object },
    author: { type: Object },
    assignee: { type: Object },
    time_stats: { type: Object },
    task_completion_status: { type: Object },
    module: { text_pattern: 'Module: ', type: String },
    origin: { text_pattern: 'Origin: ', type: String },
    priority: { text_pattern: 'Priority Level: ', type: Number },
    project: { text_pattern: 'Project: ', type: Object },
    sprint: { text_pattern: 'Sprint: ', type: String },
    status: { text_pattern: 'Status: ', type: String },
    type: { text_pattern: 'Type: ', type: String },
    goal: { text_pattern: 'Goal: ', type: String },
    weight: { text_pattern: 'Weight: ', type: Number },
    planning: { text_pattern: 'Not Planned', type: String, enum: ['Não Planejada', 'Planejada'], default: 'Planejada' }
};

export const Model = model('issue', new Schema(Properties));