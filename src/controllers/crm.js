import mongoose from 'mongoose';

import { ContactSchema } from '../models/crm';

const Contact = mongoose.model('Contact', ContactSchema);

export const addNewContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();

    res.json(savedContact);
  } catch (error) {
    res.send(error);
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();

    res.json(contacts);
  } catch (error) {
    res.send(error);
  }
};

export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.contactId);

    res.json(contact);
  } catch (error) {
    res.send(error);
  }
};

export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      { new: true },
    );

    res.json(contact);
  } catch (error) {
    res.send(error);
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const result = await Contact.findByIdAndDelete(contactId);

    res.json({
      message:
        result === null
          ? `Contact id: ${contactId} does not exist`
          : `Successfully deleted contact id: ${contactId}`,
    });
  } catch (error) {
    res.send(error);
  }
};
