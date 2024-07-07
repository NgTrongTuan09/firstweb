document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section"); // Lấy tất cả các phần tử <section>
    const defaultSection = document.querySelector("#gioithieu"); // Lấy phần tử <section> có id="gioithieu"

    // Hiển thị phần giới thiệu bản thân khi trang vừa mở
    defaultSection.classList.add("active");

    // Thêm sự kiện click cho các liên kết trong sidebar
    document.querySelectorAll(".sidebar a").forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ a

            // Ẩn tất cả các phần tử section
            sections.forEach(section => section.classList.remove("active"));

            // Hiển thị phần tử section được chọn
            const targetSection = document.querySelector(this.getAttribute("href"));
            if (targetSection) {
                targetSection.classList.add("active");
            }
        });
    });

    // Thêm sự kiện click cho các hình ảnh trong phần giấy khen
    document.querySelectorAll('.hinhanhgiaykhen').forEach(image => {
        image.addEventListener('click', function() {
            const mediaUrl = this.getAttribute('src'); // Lấy đường dẫn của hình ảnh đã click
            const overlayImg = document.getElementById('overlayImgGiayKhen');
            const overlay = document.getElementById('overlayGiayKhen');

            overlayImg.setAttribute('src', mediaUrl); // Thiết lập hình ảnh lớn
            overlay.style.display = 'flex'; // Hiển thị overlay
        });
    });

    // Thêm sự kiện click cho các hình ảnh và video trong phần kỉ niệm
    document.querySelectorAll('.hinhanhkn, .videokn').forEach(element => {
        element.addEventListener('click', function() {
            const isVideo = this.tagName.toLowerCase() === 'video';
            const mediaUrl = this.getAttribute('src'); // Lấy đường dẫn của phần tử đã click
            const overlayImg = document.getElementById('overlayImgKiniem');
            const overlayVideo = document.getElementById('overlayVideoKiniem');
            const overlay = document.getElementById('overlayKiniem');

            if (isVideo) {
                overlayVideo.setAttribute('src', mediaUrl); // Thiết lập video lớn
                overlayVideo.style.display = 'block'; // Hiển thị video
                overlayImg.style.display = 'none'; // Ẩn hình ảnh
            } else {
                overlayImg.setAttribute('src', mediaUrl); // Thiết lập hình ảnh lớn
                overlayImg.style.display = 'block'; // Hiển thị hình ảnh
                overlayVideo.style.display = 'none'; // Ẩn video
            }
            overlay.style.display = 'flex'; // Hiển thị overlay
        });
    });

    // Đóng overlay khi click ra ngoài cho phần giấy khen
    document.getElementById('overlayGiayKhen').addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });

    // Đóng overlay khi click ra ngoài cho phần kỉ niệm
    document.getElementById('overlayKiniem').addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
            document.getElementById('overlayVideoKiniem').pause(); // Dừng video khi đóng overlay
        }
    });

    // Đóng overlay PDF khi click ra ngoài
    document.getElementById('overlayPdf').addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });

});

// Hiển thị file PDF trong overlay
function showPDF(pdfFile) {
    const overlayPdf = document.getElementById('overlayPdf');
    overlayPdf.innerHTML = `<iframe src="${pdfFile}" width="100%" height="600px"></iframe>`;
    overlayPdf.style.display = 'flex'; // Hiển thị overlay PDF
}
