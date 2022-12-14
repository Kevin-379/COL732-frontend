import StudentAssignmentBox from "./stuAsBox";


type Props = {
    entry_no:string,
    role:string,
    course_id:string,
    asmt_id:string,
    iso:string,
    start_time:number,
    end_time:number,
    submitted:boolean,
    setSubmitted:(val: boolean) => void
}
function VersionTree(props:Props){
    /*
    TODO - fetch the assignment versions for course_id/asmt_id/role/entry_no
    it will give list of versions {version_no:, version_name:, prev_version}
    contruct a tree of nodes of (version_no, version_name) from the above data
    When assignment is created the 0th version is the template set by TA
    On click a node, Buttons with options will be popped
    */
   return (
    <>
        <StudentAssignmentBox course_id={props.course_id} entry_no={props.entry_no} 
        asmt_id={props.asmt_id} iso={props.iso} start_time={props.start_time} end_time={props.end_time}
        submitted={props.submitted} setSubmitted={props.setSubmitted}/>
    </>
   );
}
export default VersionTree;