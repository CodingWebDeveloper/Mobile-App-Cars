export const validateForm = (carInput) => {
  const newErrors = {
    brand: carInput.brand ? "" : "Brand is required.",
    model: carInput.model ? "" : "Model is required.",
    description: carInput.description ? "" : "Description is required.",
  };

  // Return true if no errors
  return newErrors;
};
