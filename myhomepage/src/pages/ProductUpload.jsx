import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";


const ProductUpload = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({
        productName :'',
        productCode :'',
        category :'',
        price :'',
        stockQuantity :'',
        description :'',
        manufacturer :'',
        imageUrl :'',
    });
    const [errors, setErrors] = useState({});

    const categories = [
        '전자제품','가전제품','의류','식품','도서','악세사리','스포츠','완구','가구','기타'
    ]
    // 입력값 변경 핸들러
    const handleChange = (e) => {
        const {name, value} = e.target;
        setProduct(p => ({
            ...p,[name]: value,
        }));

        // 입력 시 해당 필드의 에러 메세지 제거
        if(errors[name]) {
            setErrors(p => ({
                ...p, [name]:''
            }));
        }
    };

    // 폼 유효성 검사
    const validateForm = () => {
        const newErrors = {};
        if(!product.productName.trim()){
            newErrors.productName='상품명을 입력하세요.';
        }
    }

    // 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!validateForm()){
            return;
        }
        setLoading(true);
        // 백엔드 연결 시도
        try{
            const r = await  axios.post(
                '/api/product',product
            );
            if(r.data.success){
                alert(r.data.message);
                navigate("/")
            }
        } catch (err) { // 백엔드 연결 실패
            console.error(err);

            if(err.r?.data?.message){
                alert(err.r.data.message);
            } else{
                alert("상품 등록에 실패했습니다. 다시 시도해주세요.");
            }
        }finally{
            setLoading(false); // 상품 등록을 성공, 실패 이후 loading 중단
        }
    }

    const handleCancel = () => {
        if(window.confirm("작성 중인 내용이 사라집니다. 작성을 취소하시겠습니까?")) {
            navigate("/");
        }
    }

    return(
        <div className="page-container"></div>
    )
}

export  default ProductUpload;