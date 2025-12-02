import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {handleInputChange} from "../service/commonService";

// 상품 이미지 업로드 변경
// profileImage -> imageUrl 을 이용해서 상품 업로드시 제품 미리보기

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
        imageUrl :''
    });
    const [formData, setFormData] = useState({
        productName :'',
        productCode :'',
        category :'',
        price :'',
        stockQuantity :'',
        description :'',
        manufacturer :''
    })
    const [imageFile, setImageFile] = useState(null);
    const [errors, setErrors] = useState({});
    const categories = [
        '전자제품','가전제품','의류','식품','도서','악세사리','스포츠','완구','가구','기타'
    ]
    const [previewImage, setPreviewImage] = useState(null);

    //  기존 변수명칭은 모두 setFormData 사용
    //  setProduct 변수명칭 사용
    //  제품 업로드를 했을 때 제품이 무사히 업로드 되는지 확인
    const handleChange = (e) => {
        const {name, value} = e.target;
        handleInputChange(e, setFormData);
        // 입력 시 해당 필드의 에러 메세지 제거
        if(errors[name]) {
            setErrors(p => ({
                ...p, [name]:''
            }));
        }
    }

    const handleChangeImage = (e) => {
        /*
        type=file은 이미지 이외에도 항시 1개 이상의 데이터를 가져오는 것이 기본 전제로 된 속성이다.
        multipart 작성하지 않아 input에서 하나의 이미지만 가져온다 하더라도 항시 [0]번째 데이터를 가져온다고 작성해야 한다.
         */
        const firstImageFile = e.target.files[0];
        if(firstImageFile) {
            if(!firstImageFile.type.startsWith("image/")) {
                alert("이미지만 가능함");
                return;
            }
            const maxSize =  5 * 1024 * 1024
            if(firstImageFile.size > maxSize) {
                alert("파일 크기는 5MB 를 초과할 수 없습니다.");
                return;
            }
            /*
            FileReader 라는 JS에 내장된 기능을 사용해서 파일 미리보기 생성한다.
             */
            const reader = new FileReader();
            reader.onload = (event) => {
                /**
                 * FileReader를 만든 개발자가 target한 다음 value나 files[인덱스] 대신
                 * 가져온 것에 대한 결과라는 변수명을 사용하여 result 사용한다.
                 */
                setPreviewImage(event.target.result);
            };
            /**
             * URL에 존재하는 데이터를 reader에서 읽는다.
             */
            reader.readAsDataURL(firstImageFile);
            setImageFile(firstImageFile);
            setProduct( prev => ({
                ...prev,
                imageUrl: firstImageFile
            }))
        }
    }

    // 폼 유효성 검사
    const validateForm = () => {
        const newErrors = {};
        if(!product.productName.trim()){
            newErrors.productName='상품명을 입력하세요.';
        }
        if(!product.productCode.trim()){
            newErrors.productCode='상품코드를 입력하세요.';
        }
        if(!product.category.trim()){
            newErrors.category='카테고리를 입력하세요.';
        }
        if(!product.price || product.price <= 0){
            newErrors.price='가격을 입력하세요.';
        }
        if(!product.stockQuantity || product.stockQuantity <= 0){
            newErrors.stockQuantity='재고 수량을 입력하세요.';
        }
        setErrors(newErrors);
        /**
         * 에러 값이 모두 다 데이터 0일때만 통과하고, 에러 값이 존재하면 반환?
         */
        return Object.keys(newErrors).length === 0;

    }

    // 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();
    /*
        if(!validateForm()){
            return;
        }

     */
        setLoading(true);
        // 백엔드 연결 시도
        try{
            const uploadFormData = new FormData();
            /**
             * product에서 imageUrl을 제외한 나머지 데이터만 productData 변수명 내에 데이터 전달한다.
             */
            const {imageUrl, ...productData} = product;
            /**
             * product 정보를 JSON Blob으로 추가한다.
             * Blob은 MySQL에 없는 ORACLE 개념이다.
             */
            const productBlob = new Blob(
                [JSON.stringify(productData)],
                {type: 'application/json'}
            );
            uploadFormData.append('product', productBlob);

            /**
             * 이미지 파일이 있다면 추가한다.
             */
            if(imageUrl) {
                uploadFormData.append('imageUrl, imageUrl');
            }

            const r = await  axios.post(
                'http://localhost:8085/api/product', uploadFormData, {
                    headers : {
                        'Content-Type' : 'multipart/form-data'
                    }
                }
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
        <div className="page-container">
            <div className="product-upload-container">
                <h2>상품 등록</h2>
                <form onSubmit={handleSubmit} className="product-form">
                    <div className="form-group">
                        <label htmlFor="productName">
                            상품명<span className="required">*</span>
                        </label>
                        <input
                            type={"text"}
                            id="productName"
                            name="productName"
                            value={product.productName}
                            onChange={handleChange}
                            placeholder="상품명을 입력하세요."
                            maxLength="200"
                        />
                        {errors.productName &&(
                            <span className="error">{errors.productName}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="productCode">
                            상품코드<span className="required">*</span>
                        </label>
                        <input
                            type={"text"}
                            id="productCode"
                            name="productCode"
                            value={product.productCode}
                            onChange={handleChange}
                            placeholder="상품코드를 입력하세요."
                            maxLength="200"
                        />
                        {errors.productCode &&(
                            <span className="error">{errors.productCode}</span>
                        )}
                        <small className="form-hint">
                            영문, 대문자, 숫자, 하이픈(-) 만 사용 가능
                        </small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">
                            카테고리<span className="required">*</span>
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={product.category}
                            onChange={handleChange}>
                            <option value="">카테고리를 선택하세요.</option>
                            {categories.map(category => (
                                <option key={category}
                                        value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        {errors.category &&(
                            <span className="error">{errors.category}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">
                            가격<span className="required">*</span>
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            placeholder="가격 (원)"
                            min="0"
                        />
                        {errors.price &&(
                            <span className="error">{errors.price}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="stockQuantity">
                            재고수량<span className="required">*</span>
                        </label>
                        <input
                            type="number"
                            id="stockQuantity"
                            name="stockQuantity"
                            value={product.stockQuantity}
                            onChange={handleChange}
                            placeholder="재고 수량"
                            min="0"
                        />
                        {errors.stockQuantity &&(
                            <span className="error">{errors.stockQuantity}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="manufacturer">
                            제조사
                        </label>
                        <input
                            type="text"
                            id="manufacturer"
                            name="manufacturer"
                            value={product.manufacturer}
                            onChange={handleChange}
                            placeholder="제조사 명을 입력하세요."
                            maxLength="100"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="imageUrl"
                               className="btn-upload">
                            이미지 URL
                        </label>
                        <input
                            // type="url"
                            type="file"
                            id="imageUrl"
                            name="imageUrl"
                            onChange={handleChangeImage}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                        <small className="form-hint">
                            {/*상품 이미지의 URL 을 입력하세요.*/}
                            상품 이미지를 업로드하세요. (최대 5MB 이미지 파일만 가능합니다.)
                        </small>
                        {previewImage && (
                            <div className="image-preview">
                                <img src={previewImage}
                                     alt={previewImage}
                                     style={{
                                         maxWidth: '300px',
                                         maxHeight: '300px',
                                         marginTop: '10px',
                                         border: '1px solid #ddd',
                                         borderRadius: '5px',
                                         paddingTop: '5px'
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">
                           상품설명
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            placeholder="상품에 대한 설명을 입력하세요"
                            rows="5"
                        />
                    </div>
                    <div className="form-buttons">
                        <button type="submit" 
                                className="btn-submit" 
                                disabled={loading}>
                            {loading ? '등록 중...' : '등록' }
                        </button>
                        <button type="button"
                                className="btn-cancel"
                                onClick={handleCancel}
                                disabled={loading}>
                            취소
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export  default ProductUpload;