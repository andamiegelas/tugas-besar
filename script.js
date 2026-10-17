// Data awal dummy tugas kuliah
const DATA_AWAL = [
    {
        id: 1,
        mataKuliah: "Web Programming",
        judul: "Tugas 5 JavaScript & jQuery",
        deadline: "2026-10-25",
        prioritas: "tinggi",
        status: "proses",
        deskripsi: "Menerapkan interaktivitas sisi klien dengan JavaScript dan jQuery."
    },
    {
        id: 2,
        mataKuliah: "Basis Data",
        judul: "ERD Toko Online",
        deadline: "2026-10-28",
        prioritas: "sedang",
        status: "belum",
        deskripsi: "Merancang skema relasi dan diagram ERD toko online."
    },
    {
        id: 3,
        mataKuliah: "Kalkulus II",
        judul: "Latihan Soal Integral",
        deadline: "2026-10-30",
        prioritas: "rendah",
        status: "selesai",
        deskripsi: "Mengerjakan bab 4 nomor 1 sampai 15 di buku paket."
    }
];

// Mengambil data dari localStorage atau data awal
function ambilDaftarTugas() {
    const dataDisimpan = localStorage.getItem("taskmate_tugas");
    if (dataDisimpan) {
        try {
            return JSON.parse(dataDisimpan);
        } catch (e) {
            return DATA_AWAL;
        }
    }
    simpanDaftarTugas(DATA_AWAL);
    return DATA_AWAL;
}

// Menyimpan data ke localStorage
function simpanDaftarTugas(data) {
    localStorage.setItem("taskmate_tugas", JSON.stringify(data));
}

// Function JavaScript murni: menghitung statistik tugas
function hitungStatistik(data) {
    let total = data.length;
    let belum = 0;
    let proses = 0;
    let selesai = 0;

    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (item.status === "belum") {
            belum++;
        } else if (item.status === "proses") {
            proses++;
        } else if (item.status === "selesai") {
            selesai++;
        }
    }

    return { total, belum, proses, selesai };
}

// Function JavaScript murni: memfilter data tugas
function filterDataTugas(data, filterStatus) {
    if (!filterStatus || filterStatus === "semua") {
        return data;
    }
    return data.filter(function(item) {
        return item.status === filterStatus;
    });
}

// Format tampilan prioritas
function formatPrioritas(prioritas) {
    if (prioritas === "tinggi") {
        return '<span class="badge-prioritas prioritas-tinggi">Tinggi</span>';
    } else if (prioritas === "sedang") {
        return '<span class="badge-prioritas prioritas-sedang">Sedang</span>';
    } else {
        return '<span class="badge-prioritas prioritas-rendah">Rendah</span>';
    }
}

// Format tampilan status
function formatStatus(status) {
    if (status === "proses") {
        return '<span class="badge-status status-proses">Sedang Dikerjakan</span>';
    } else if (status === "selesai") {
        return '<span class="badge-status status-selesai">Selesai</span>';
    } else {
        return '<span class="badge-status status-belum">Belum Dimulai</span>';
    }
}

// Function JavaScript murni: me-render tabel secara dinamis
function renderTabel(data) {
    const tbody = document.getElementById("tabel-tugas-body");
    if (!tbody) return;

    tbody.innerHTML = "";

    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted py-3">Tidak ada data tugas yang sesuai filter.</td></tr>';
        return;
    }

    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const row = document.createElement("tr");
        row.setAttribute("id", "baris-tugas-" + item.id);
        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${item.mataKuliah}</td>
            <td>${item.judul}</td>
            <td>${item.deadline}</td>
            <td>${formatPrioritas(item.prioritas)}</td>
            <td>${formatStatus(item.status)}</td>
            <td>
                <a href="detail-tugas.html" class="btn btn-outline-primary btn-sm me-1">Detail</a>
                <button type="button" class="btn btn-outline-danger btn-sm btn-hapus" data-id="${item.id}">Hapus</button>
            </td>
        `;
        tbody.appendChild(row);
    }
}

// Memperbarui dashboard (angka statistik + isi tabel)
let statusFilterAktif = "semua";

function perbaruiDashboard() {
    const semuaTugas = ambilDaftarTugas();
    const stats = hitungStatistik(semuaTugas);

    const elTotal = document.getElementById("angka-total");
    const elBelum = document.getElementById("angka-belum");
    const elProses = document.getElementById("angka-proses");
    const elSelesai = document.getElementById("angka-selesai");

    if (elTotal) elTotal.textContent = stats.total;
    if (elBelum) elBelum.textContent = stats.belum;
    if (elProses) elProses.textContent = stats.proses;
    if (elSelesai) elSelesai.textContent = stats.selesai;

    const dataTampil = filterDataTugas(semuaTugas, statusFilterAktif);
    renderTabel(dataTampil);
}

// Menampilkan pesan notifikasi dengan jQuery fadeIn / fadeOut
function tampilkanNotifikasi(pesan, tipe = "success") {
    const notif = $("#notifikasi-alert");
    if (!notif.length) return;

    notif.removeClass("alert-success alert-danger alert-warning").addClass("alert-" + tipe);
    $("#notifikasi-pesan").text(pesan);
    notif.stop(true, true).fadeIn(200).delay(2500).fadeOut(400);
}

// Interaktivitas jQuery
$(document).ready(function() {
    // 1. Inisialisasi halaman dashboard (index.html)
    if ($("#tabel-tugas-body").length) {
        perbaruiDashboard();

        // Efek jQuery slideToggle untuk membuka/menutup panel filter
        $("#btn-toggle-filter").on("click", function() {
            $("#panel-filter").slideToggle(200);
        });

        // Event filter data tugas saat tombol filter diklik
        $(".btn-filter").on("click", function() {
            $(".btn-filter").removeClass("active");
            $(this).addClass("active");
            statusFilterAktif = $(this).data("status");
            perbaruiDashboard();
        });

        // Event reset data dummy awal
        $("#btn-reset-data").on("click", function() {
            simpanDaftarTugas(DATA_AWAL);
            statusFilterAktif = "semua";
            $(".btn-filter").removeClass("active");
            $('.btn-filter[data-status="semua"]').addClass("active");
            perbaruiDashboard();
            tampilkanNotifikasi("Data dummy berhasil di-reset ke nilai awal.");
        });

        // Event jQuery on('click') untuk menghapus baris tugas
        $(document).on("click", ".btn-hapus", function() {
            const idHapus = parseInt($(this).data("id"));
            const daftar = ambilDaftarTugas();
            const baris = $("#baris-tugas-" + idHapus);

            // Efek jQuery fadeOut saat menghapus baris
            baris.fadeOut(300, function() {
                const sisaTugas = daftar.filter(function(item) {
                    return item.id !== idHapus;
                });
                simpanDaftarTugas(sisaTugas);
                perbaruiDashboard();
                tampilkanNotifikasi("Tugas berhasil dihapus.");
            });
        });

        // Tombol close notifikasi
        $("#btn-close-notifikasi").on("click", function() {
            $("#notifikasi-alert").fadeOut(200);
        });
    }

    // 2. Interaktivitas halaman tambah tugas (tambah-tugas.html)
    const formTambah = $("#form-tambah-tugas");
    if (formTambah.length) {
        formTambah.on("submit", function(e) {
            e.preventDefault();

            const matkul = $("#mata-kuliah").val().trim();
            const judul = $("#judul-tugas").val().trim();
            const deadline = $("#deadline").val();
            const prioritas = $("#prioritas").val();
            const status = $("#status").val();
            const deskripsi = $("#deskripsi").val().trim();

            // Validasi input sederhana
            if (!matkul || !judul || !deadline || !prioritas || !status) {
                $("#alert-sukses").hide();
                $("#alert-error").text("Mohon isi seluruh bidang wajib formulir.").slideDown(200);
                return;
            }

            // Sembunyikan pesan error jika validasi lolos
            $("#alert-error").slideUp(150);

            // Buat objek tugas baru
            const daftar = ambilDaftarTugas();
            const idBaru = daftar.length > 0 ? Math.max(...daftar.map(d => d.id)) + 1 : 1;

            const tugasBaru = {
                id: idBaru,
                mataKuliah: matkul,
                judul: judul,
                deadline: deadline,
                prioritas: prioritas,
                status: status,
                deskripsi: deskripsi
            };

            daftar.push(tugasBaru);
            simpanDaftarTugas(daftar);

            // Efek jQuery fadeIn untuk konfirmasi sukses
            $("#alert-sukses").fadeIn(250);
            formTambah[0].reset();
        });
    }

    // 3. Interaktivitas halaman detail tugas (detail-tugas.html)
    if ($("#daftar-subtugas").length) {
        // Toggle sembunyikan/tampilkan daftar sub-tugas
        $("#btn-toggle-subtugas").on("click", function() {
            $("#daftar-subtugas").slideToggle(200, function() {
                if ($("#daftar-subtugas").is(":visible")) {
                    $("#btn-toggle-subtugas").text("Sembunyikan Sub-Tugas");
                } else {
                    $("#btn-toggle-subtugas").text("Tampilkan Sub-Tugas");
                }
            });
        });

        // Klik sub-tugas untuk menandai selesai (toggle class)
        $(".item-subtugas").on("click", function() {
            $(this).toggleClass("subtugas-selesai");
        });
    }
});
