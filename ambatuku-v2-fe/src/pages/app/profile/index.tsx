import { Check, Share2 } from "lucide-react";

import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

import { useAuthStore } from "@/stores/auth";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const addresses = [
  {
    receiverName: "Naufal",
    phone: "62812345678",
    city: "Bogor",
    label: "Rumah",
    fullAddress: "Jl. In Aja Dulu",
    note: "Di dekat dia",
    mainAddress: true,
    selected: true,
  },
  {
    receiverName: "Ipan",
    phone: "62812345678",
    city: "Bogor",
    label: "Kantor",
    fullAddress: "Jl. Yang Bener",
    note: null,
    mainAddress: false,
    selected: false,
  },
];

export default function ProfilePage() {
  const { user } = useAuthStore();
  if (!user) return null;
  return (
    <>
      <div className='mb-8 flex flex-col gap-8 md:flex-row'>
        <div className='flex w-full flex-col items-center md:w-1/3'>
          <h3 className='mb-4 text-lg font-medium'>Ubah Biodata Diri</h3>
          <div className='mb-4 h-48 w-48 overflow-hidden rounded-lg'>
            <img
              src={user.profile_picture || "/user-placeholder.png"}
              alt='Profile'
              width={192}
              height={192}
              className='h-full w-full object-cover'
            />
          </div>
          <Button className='w-full border border-gray-300 bg-white text-gray-800 hover:bg-gray-100'>
            Pilih Foto
          </Button>
          <p className='mt-4 text-center text-xs text-gray-500'>
            Besar file: maksimum 10.000.000 bytes (10 Megabytes). Ekstensi file
            yang diperbolehkan: .JPG .JPEG .PNG
          </p>
        </div>
        <div className='w-full md:w-2/3'>
          <div className='space-y-6'>
            <div>
              <h3 className='mb-4 text-lg font-medium'>Ubah Biodata Diri</h3>
              <div className='space-y-4'>
                <div className='flex flex-col md:flex-row md:items-center'>
                  <div className='w-full md:w-1/3'>
                    <label className='text-sm text-gray-600'>Nama</label>
                  </div>
                  <div className='flex w-full items-center gap-2 md:w-2/3'>
                    <span className='text-sm'>{user.name}</span>
                    <Button
                      variant='link'
                      className='h-auto p-0 text-sm text-green-600'
                    >
                      Ubah
                    </Button>
                  </div>
                </div>
                <div className='flex flex-col md:flex-row md:items-center'>
                  <div className='w-full md:w-1/3'>
                    <label className='text-sm text-gray-600'>
                      Tanggal Lahir
                    </label>
                  </div>
                  <div className='flex w-full items-center gap-2 md:w-2/3'>
                    {user.date ? (
                      <span className='text-sm'>{formatDate(user.date)}</span>
                    ) : (
                      <Button
                        variant='link'
                        className='h-auto p-0 text-sm text-green-600'
                      >
                        Tambah Tanggal Lahir
                      </Button>
                    )}
                  </div>
                </div>
                <div className='flex flex-col md:flex-row md:items-center'>
                  <div className='w-full md:w-1/3'>
                    <label className='text-sm text-gray-600'>
                      Jenis Kelamin
                    </label>
                  </div>
                  <div className='flex w-full items-center gap-2 md:w-2/3'>
                    {user.gender ? (
                      <>
                        <span className='text-sm'>{user.gender}</span>
                      </>
                    ) : (
                      <Button
                        variant='link'
                        className='h-auto p-0 text-sm text-green-600'
                      >
                        Tambah Jenis Kelamin
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className='mb-4 text-lg font-medium'>Ubah Kontak</h3>
              <div className='space-y-4'>
                <div className='flex flex-col md:flex-row md:items-center'>
                  <div className='w-full md:w-1/3'>
                    <label className='text-sm text-gray-600'>Email</label>
                  </div>
                  <div className='flex w-full items-center gap-2 md:w-2/3'>
                    {user.email ? (
                      <>
                        <span className='text-sm'>{user.email}</span>
                        <Badge className='rounded bg-green-100 px-2 py-0.5 text-xs text-green-800'>
                          Terverifikasi
                        </Badge>
                        <Button
                          variant='link'
                          className='h-auto p-0 text-sm text-green-600'
                        >
                          Ubah
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant='link'
                        className='h-auto p-0 text-sm text-green-600'
                      >
                        Tambah Email
                      </Button>
                    )}
                  </div>
                </div>
                <div className='flex flex-col md:flex-row md:items-center'>
                  <div className='w-full md:w-1/3'>
                    <label className='text-sm text-gray-600'>Nomor HP</label>
                  </div>
                  <div className='flex w-full items-center gap-2 md:w-2/3'>
                    {user.phone_number ? (
                      <>
                        <span className='text-sm'>{user.phone_number}</span>
                        <Badge className='rounded bg-green-100 px-2 py-0.5 text-xs text-green-800'>
                          Terverifikasi
                        </Badge>
                        <Button
                          variant='link'
                          className='h-auto p-0 text-sm text-green-600'
                        >
                          Ubah
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant='link'
                        className='h-auto p-0 text-sm text-green-600'
                      >
                        Tambah Nomor HP
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
