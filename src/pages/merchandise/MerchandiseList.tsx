import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { Merchandise } from "../../types";
import { merchandise } from "../../services/api";
import toast from "react-hot-toast";
import Loading from "../../components/common/Loading";

export const MerchandiseList: React.FC = () => {
  const [items, setItems] = useState<Merchandise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMerchandise();
  }, []);

  const fetchMerchandise = async () => {
    try {
      const data = await merchandise.getAll();
      setItems(data);
    } catch (error) {
      toast.error("Failed to load merchandise");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await merchandise.delete(id);
        toast.success("Item deleted successfully");
        fetchMerchandise();
      } catch (error) {
        toast.error("Failed to delete item");
      }
    }
  };

  const handleStockUpdate = async (id: string, stockCount: number) => {
    try {
      await merchandise.updateStock(id, stockCount);
      toast.success("Stock updated successfully");
      fetchMerchandise();
    } catch (error) {
      toast.error("Failed to update stock");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Merchandise</h2>
        <Link to="/merchandise/new">
          <Button>
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Item
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item._id} className="relative">
            <div className="aspect-w-3 aspect-h-2">
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.description}</p>
              <p className="text-lg font-bold text-primary-600 mt-2">
                Frw {item.price.toFixed(2)}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-500">Stock:</label>
                  <input
                    type="number"
                    min="0"
                    value={item.stockCount}
                    onChange={(e) =>
                      handleStockUpdate(item._id, parseInt(e.target.value))
                    }
                    className="w-20 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div className="flex space-x-2">
                  <Link to={`/merchandise/edit/${item._id}`}>
                    <Button variant="secondary" className="p-2">
                      <PencilIcon className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    className="p-2"
                    onClick={() => handleDelete(item._id)}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
            <div
              className={`absolute top-2 right-2 px-2 py-1 rounded text-sm font-medium ${
                item.inStock
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {item.inStock ? "In Stock" : "Out of Stock"}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
