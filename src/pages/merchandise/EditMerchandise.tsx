import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../../components/common/Card";
import { MerchandiseForm } from "../../components/merchandise/MerchandiseForm";
import { merchandise } from "../../services/api";
import { Merchandise } from "../../types";
import toast from "react-hot-toast";

export const EditMerchandise: React.FC = () => {
  const [item, setItem] = useState<Merchandise | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetchMerchandise();
  }, [id]);

  const fetchMerchandise = async () => {
    try {
      if (id) {
        const data = await merchandise.getOne(id);
        setItem(data);
      }
    } catch (error) {
      toast.error("Failed to load product");
      navigate("/merchandise");
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      if (id) {
        await merchandise.update(id, formData);
        toast.success("Product updated successfully");
        navigate("/merchandise");
      }
    } catch (error) {
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Edit Product</h2>
      <Card>
        {item && (
          <MerchandiseForm
            initialData={item}
            onSubmit={handleSubmit}
            isLoading={loading}
          />
        )}
      </Card>
    </div>
  );
};
