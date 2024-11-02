import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/common/Card";
import { MerchandiseForm } from "../../components/merchandise/MerchandiseForm";
import { merchandise } from "../../services/api";
import toast from "react-hot-toast";

export const AddMerchandise: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      await merchandise.create(formData);
      toast.success("Product created successfully");
      navigate("/merchandise");
    } catch (error) {
      toast.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
      <Card>
        <MerchandiseForm onSubmit={handleSubmit} isLoading={loading} />
      </Card>
    </div>
  );
};
