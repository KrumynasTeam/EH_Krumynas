using AutoWrapper;

namespace EKrumynas.Middleware
{
    public class ResponseWrapper
{
        [AutoWrapperPropertyMap(Prop.StatusCode)]
        public int Status { get; set; }
        [AutoWrapperPropertyMap(Prop.IsError)]
        public bool IsError { get; set; }

        [AutoWrapperPropertyMap(Prop.ResponseException_ExceptionMessage)]
        public string Message { get; set; }

        [AutoWrapperPropertyMap(Prop.ResponseException)]
        public object Error { get; set; }

        [AutoWrapperPropertyMap(Prop.Result)]
        public object Result { get; set; }
    }
}
