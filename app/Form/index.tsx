import { useTranslate } from "@/context/LanguageContext";

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
                    >
                        <option value="tidak_hadir">{t('kehadiran.berhalangan_hadir')}</option>
                        <option value="belum_pasti">{t('kehadiran.belum_pasti')}</option>
                        <option value="hadir">{t('kehadiran.hadir')}</option>
                    </select>
                </div>
                <button
                    onClick={handleClick}
                    className="bg-[#EB2929] py-4 w-full text-white mt-8 font-medium rounded-md"
                >
                     {t('ucapan.kirim')}
                </button>
            </div>
        </>
    )
}