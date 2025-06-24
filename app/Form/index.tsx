import { useTranslate } from "@/context/LanguageContext";
import { useState } from "react";

interface FormProps {
    setName: React.Dispatch<React.SetStateAction<string>>;
    name: string
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    setAttend: React.Dispatch<React.SetStateAction<string>>;
    handleClick: () => Promise<void>
}

export const Form: React.FC<FormProps> = ({
    setName,
    setMessage,
    name,
    setAttend,
    handleClick
}) => {

    const t = useTranslate()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            await handleClick()
        } catch (error) {
            console.error('Error submitting form:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="mt-16">
                <div className="flex flex-col">
                    <label className="mb-2 lg:text-2xl text-lg" htmlFor="">
                        {t('ucapan.nama')}
                    </label>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text"
                        className="bg-white h-10 text-black px-3"
                        disabled={isLoading}
                    />
                </div>
                <div className="flex flex-col mt-10">
                    <label className="mb-2 lg:text-2xl text-lg" htmlFor="">
                        {t('ucapan.pesan')}
                    </label>
                    <textarea
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        className="bg-white text-black px-3"
                        disabled={isLoading}
                    />
                </div>
                <div className="mt-10 flex flex-col">
                    <label
                        className="mb-2 lg:text-2xl text-lg"
                        htmlFor="attendance"
                    >
                         {t('ucapan.kehadiran')}
                    </label>
                    <select
                        onChange={(e) => setAttend(e.target.value)}
                        className="h-10 px-2 text-black border border-gray-300 rounded"
                        name="attendance"
                        id="attendance"
                        defaultValue="berhalangan-hadir"
                        aria-label="Attendance options"
                        disabled={isLoading}
                    >
                        <option value="tidak_hadir">{t('kehadiran.berhalangan_hadir')}</option>
                        <option value="belum_pasti">{t('kehadiran.belum_pasti')}</option>
                        <option value="hadir">{t('kehadiran.hadir')}</option>
                    </select>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={`py-4 w-full text-white mt-8 font-medium rounded-md flex items-center justify-center gap-2 transition-all duration-200 ${
                        isLoading 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-[#EB2929] hover:bg-[#d12424]'
                    }`}
                >
                    {isLoading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Mengirim...</span>
                        </>
                    ) : (
                        <>
                            <span>{t('ucapan.kirim')}</span>
                        </>
                    )}
                </button>
            </div>
        </>
    )
}