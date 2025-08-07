const newsletterService = require('../services/newsletter.service');

const subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email es requerido' });

    const result = await newsletterService.addSubscriber(email);
    res.status(201).json({ message: 'Suscripción exitosa', subscriberId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al suscribir', error: error.message });
  }
};

const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await newsletterService.getSubscribers();
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener suscriptores', error: error.message });
  }
};

module.exports = { subscribe, getAllSubscribers };