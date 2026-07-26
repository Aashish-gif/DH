const express = require('express');
const Lead = require('../models/Lead');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  createLeadValidation,
  updateStatusValidation,
} = require('../validators/leadValidators');

const router = express.Router();

// POST /api/leads — create a new lead (public)
router.post('/', createLeadValidation, validate, async (req, res) => {
  try {
    const { name, email, budgetRange, message } = req.body;
    const lead = await Lead.create({ name, email, budgetRange, message });
    return res.status(201).json({
      success: true,
      data: lead,
      message: 'Lead submitted successfully',
    });
  } catch (error) {
    console.error('Error creating lead:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while creating lead',
    });
  }
});

// GET /api/leads — list leads with optional search (authenticated)
router.get('/', auth, async (req, res) => {
  try {
    const { search } = req.query;
    const filter = {};

    if (search && String(search).trim()) {
      const regex = new RegExp(String(search).trim(), 'i');
      filter.$or = [{ name: regex }, { email: regex }];
    }

    const leads = await Lead.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching leads',
    });
  }
});

// PATCH /api/leads/:id/status — update lead status (authenticated)
router.patch('/:id/status', auth, updateStatusValidation, validate, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const lead = await Lead.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: lead,
      message: 'Status updated successfully',
    });
  } catch (error) {
    console.error('Error updating lead status:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while updating status',
    });
  }
});

module.exports = router;
