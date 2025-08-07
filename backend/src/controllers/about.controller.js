const aboutService = require('../services/about.service');

const getAboutContent = async (req, res) => {
  try {
    const content = await aboutService.getContent();
    if (!content) return res.status(404).json({ message: 'Contenido no encontrado' });
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener contenido', error: error.message });
  }
};

const updateAboutContent = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: 'El contenido es requerido' });

    const result = await aboutService.updateContent(content);
    res.status(200).json({ message: 'Contenido actualizado', result });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar contenido', error: error.message });
  }
};

module.exports = { getAboutContent, updateAboutContent };
