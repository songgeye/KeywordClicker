document.addEventListener('DOMContentLoaded', function() {
    // 単一キーワードのコピー機能
    document.querySelectorAll('[data-copy]').forEach(function(element) {
        element.addEventListener('click', function() {
            const textToCopy = this.textContent.trim();
            copyToClipboard(textToCopy);
            showFeedback(`「${textToCopy}」をコピーしました`);
        });
    });

    // キーワードグループのコピー機能
    document.querySelectorAll('.keyword-group').forEach(function(group) {
        group.addEventListener('dblclick', function() {
            const keywordsInGroup = Array.from(this.querySelectorAll('.keyword'))
                .map(el => el.textContent.trim())
                .join(' ');
            copyToClipboard(keywordsInGroup);
            showFeedback(`グループ内のキーワードをコピーしました`);
        });
    });

    // カンマ付きキーワード行のコピー機能
    document.querySelectorAll('[data-copy-row]').forEach(function(row) {
        row.addEventListener('dblclick', function() {
            const textToCopy = this.textContent.trim();
            copyToClipboard(textToCopy);
            showFeedback(`カンマ付きキーワードをコピーしました`);
        });
    });

    // カンマ付きキーワードの個別コピー
    document.querySelectorAll('.keyword-comma').forEach(function(element) {
        element.addEventListener('click', function() {
            const keyword = this.textContent.trim();
            const hasComma = this.nextElementSibling && this.nextElementSibling.classList.contains('comma');
            const textToCopy = hasComma ? keyword + ',' : keyword;
            copyToClipboard(textToCopy);
            showFeedback(`「${textToCopy}」をコピーしました`);
        });
    });

    // クリップボードにコピーする関数
    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    // フィードバックを表示する関数
    function showFeedback(message) {
        let feedback = document.querySelector('.feedback');
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.classList.add('feedback');
            document.body.appendChild(feedback);
        }
        
        feedback.textContent = message;
        feedback.style.opacity = '1';
        
        setTimeout(function() {
            feedback.style.opacity = '0';
        }, 2000);
    }
});
